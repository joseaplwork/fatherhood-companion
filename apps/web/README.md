# Web App

## Responsibility

`apps/web` is the product composition root. It assembles reusable packages into a deployable application.

## Allowed Dependencies

- External libraries required by the web application.
- Workspace packages imported through their package names.

## Forbidden Dependencies

- Imports from any other app workspace.
- Deep imports into another workspace's internal files.
- Reusable business logic that should live in a package once it needs to be shared.

## Notes

- Framework-specific entrypoints such as `app/` are treated as presentation and composition layers.
- Shared UI should come from `@/grove-companion/ui`, not local copies.
