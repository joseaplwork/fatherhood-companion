import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const WORKSPACE_GROUPS = [
  { kind: "app", parent: "apps" },
  { kind: "package", parent: "packages" },
];

const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

const IGNORED_DIRECTORY_NAMES = new Set([
  ".git",
  ".next",
  ".pnpm-store",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "storybook-static",
]);

const CODE_FILE_EXTENSIONS = new Set([
  ".cjs",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
]);

export async function loadWorkspaces(repoRoot) {
  const workspaces = [];

  for (const group of WORKSPACE_GROUPS) {
    const parentDirectory = path.join(repoRoot, group.parent);
    const entries = await safeReadDir(parentDirectory);

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const workspaceDirectory = path.join(parentDirectory, entry.name);
      const packageJsonPath = path.join(workspaceDirectory, "package.json");
      const packageJson = await safeReadJson(packageJsonPath);

      if (!packageJson) {
        continue;
      }

      workspaces.push({
        kind: group.kind,
        dir: workspaceDirectory,
        relativeDir: toRepoPath(repoRoot, workspaceDirectory),
        name: packageJson.name,
        packageJson,
        declaredDependencies: new Set(collectDeclaredDependencies(packageJson)),
      });
    }
  }

  return workspaces.sort((left, right) => left.relativeDir.localeCompare(right.relativeDir));
}

export function collectDeclaredDependencies(packageJson) {
  const dependencies = [];

  for (const field of DEPENDENCY_FIELDS) {
    dependencies.push(...Object.keys(packageJson[field] ?? {}));
  }

  return dependencies;
}

export function getWorkspaceForFile(filePath, workspaces) {
  return workspaces.find((workspace) => isWithin(workspace.dir, filePath)) ?? null;
}

export function isCodeFile(filePath) {
  return CODE_FILE_EXTENSIONS.has(path.extname(filePath));
}

export function isWithin(parentDirectory, candidatePath) {
  const relativePath = path.relative(parentDirectory, candidatePath);

  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

export async function walkFiles(rootDirectory) {
  const files = [];
  await walkDirectory(rootDirectory, files);
  return files.sort();
}

export function toRepoPath(repoRoot, filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

async function walkDirectory(directory, files) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORY_NAMES.has(entry.name)) {
        continue;
      }

      await walkDirectory(fullPath, files);
      continue;
    }

    files.push(fullPath);
  }
}

async function safeReadDir(directory) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function safeReadJson(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
