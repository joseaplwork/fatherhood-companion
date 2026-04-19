---
name: Storybook setup for packages/ui
description: Stories for all atoms, molecules, organisms, and one template — driven by Stitch screen designs
type: project
---

Storybook 10 is configured and working in `packages/ui`. All stories pass typecheck and lint.

**Why:** User wanted to extract Stitch designs into tokens and add atomic-design stories to visualise component differences.

**How to apply:** Run `pnpm --filter @/grove-companion/ui dev` to launch Storybook on port 6006.

**What was created:**
- `.storybook/main.ts` — Tailwind v4 vite plugin wired in via `viteFinal`
- `.storybook/preview.ts` — surface backgrounds, controls config
- `.storybook/preview.css` — Google Fonts (Space Grotesk + Manrope + Material Symbols), utility classes (glass-panel, ai-glow, btn-ai…)
- 35 story files total: 12 atoms · 12 molecules · 10 organisms · 1 template
- `@storybook/react` added to devDependencies (required for Meta/StoryObj types)
- `--color-on-tertiary-fixed: #281726` added to theme.css (was missing, used by EmotionTag)
- `on-tertiary-fixed` also added to tailwind.config.ts color map
