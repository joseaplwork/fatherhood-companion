import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  getWorkspaceForFile,
  isCodeFile,
  isWithin,
  loadWorkspaces,
  toRepoPath,
  walkFiles,
} from "./lib/workspaces.mjs";

const repoRoot = process.cwd();
const workspaces = await loadWorkspaces(repoRoot);

const workspaceByName = new Map(workspaces.map((workspace) => [workspace.name, workspace]));
const workspaceNames = [...workspaceByName.keys()].sort(
  (left, right) => right.length - left.length,
);
const errors = [];

for (const filePath of await walkFiles(repoRoot)) {
  if (!isCodeFile(filePath)) {
    continue;
  }

  const workspace = getWorkspaceForFile(filePath, workspaces);

  if (!workspace) {
    continue;
  }

  const source = await readFile(filePath, "utf8");
  const moduleSpecifiers = extractModuleSpecifiers(source);

  for (const specifier of moduleSpecifiers) {
    validateSpecifier({
      filePath,
      repoRoot,
      specifier,
      workspace,
    });
  }
}

if (errors.length > 0) {
  console.error("Boundary check failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Workspace boundaries are valid.");

function validateSpecifier({ filePath, repoRoot, specifier, workspace }) {
  const relativeFilePath = toRepoPath(repoRoot, filePath);

  if (specifier.startsWith("/")) {
    errors.push(`${relativeFilePath}: absolute filesystem imports are forbidden (${specifier}).`);
    return;
  }

  if (specifier.startsWith("apps/") || specifier.startsWith("packages/")) {
    errors.push(
      `${relativeFilePath}: raw workspace path imports are forbidden (${specifier}). Use package names instead.`,
    );
    return;
  }

  // @web/* is the internal alias for apps/web — same-workspace, no cross-workspace check needed
  if (specifier.startsWith("@web/")) {
    return;
  }

  if (specifier.startsWith(".")) {
    const resolvedPath = path.resolve(path.dirname(filePath), specifier);

    if (!isWithin(workspace.dir, resolvedPath)) {
      errors.push(`${relativeFilePath}: relative import escapes workspace root (${specifier}).`);
    }

    return;
  }

  const targetWorkspace = findWorkspaceForSpecifier(specifier);

  if (!targetWorkspace || targetWorkspace.dir === workspace.dir) {
    return;
  }

  if (targetWorkspace.kind === "app") {
    errors.push(
      `${relativeFilePath}: ${workspace.name} cannot import app workspace ${targetWorkspace.name}.`,
    );
    return;
  }

  if (specifier !== targetWorkspace.name) {
    errors.push(
      `${relativeFilePath}: deep imports into workspace ${targetWorkspace.name} are forbidden (${specifier}).`,
    );
    return;
  }

  if (!workspace.declaredDependencies.has(targetWorkspace.name)) {
    errors.push(
      `${relativeFilePath}: missing dependency declaration for workspace ${targetWorkspace.name}.`,
    );
  }
}

function extractModuleSpecifiers(source) {
  const specifiers = new Set();
  const patterns = [
    /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s*)?["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1];

      if (specifier) {
        specifiers.add(specifier);
      }
    }
  }

  return specifiers;
}

function findWorkspaceForSpecifier(specifier) {
  for (const workspaceName of workspaceNames) {
    if (specifier === workspaceName || specifier.startsWith(`${workspaceName}/`)) {
      return workspaceByName.get(workspaceName) ?? null;
    }
  }

  return null;
}
