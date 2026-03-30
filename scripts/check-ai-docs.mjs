import { access } from "node:fs/promises";
import path from "node:path";
import { loadWorkspaces } from "./lib/workspaces.mjs";

const repoRoot = process.cwd();

const requiredRootFiles = [
  "AGENTS.md",
  "DESIGN.md",
  "README.md",
  "docs/ai/boundaries.md",
  "docs/ai/coding-conventions.md",
  "docs/ai/context-index.generated.md",
  "docs/ai/domain-model.md",
  "docs/ai/mistake-log.md",
  "docs/ai/operating-model.md",
  "docs/decisions/README.md",
  "docs/product/vision.md",
];

const workspaces = await loadWorkspaces(repoRoot);
const missingFiles = [];

for (const relativePath of requiredRootFiles) {
  const absolutePath = path.join(repoRoot, relativePath);

  if (!(await exists(absolutePath))) {
    missingFiles.push(relativePath);
  }
}

for (const workspace of workspaces) {
  const relativePath = `${workspace.relativeDir}/README.md`;
  const absolutePath = path.join(repoRoot, relativePath);

  if (!(await exists(absolutePath))) {
    missingFiles.push(relativePath);
  }
}

if (missingFiles.length > 0) {
  console.error("Missing required AI/project documentation:");

  for (const relativePath of missingFiles) {
    console.error(`- ${relativePath}`);
  }

  process.exit(1);
}

console.log("AI documentation contract is present.");

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}
