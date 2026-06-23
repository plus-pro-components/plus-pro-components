# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Overview

A page-level component library (PlusProComponents) built on Element Plus and Vue 3. Monorepo managed with **pnpm workspaces**.

## Common Commands

```bash
# Dev: playground app on port 3000
pnpm dev

# Build everything (theme → components)
pnpm build

# Tests (vitest)
pnpm test                          # watch mode
pnpm run coverage                  # single run with coverage

# Linting
pnpm run lint                      # eslint --fix

# Type checking (component types only, see tsconfig.web.json)
pnpm run typecheck

# Docs
pnpm run docs:dev                  # VitePress docs dev server
pnpm run docs:build                # build docs

# Create a new component scaffold
pnpm run new

# Commit (interactive)
pnpm run commit
```

## Package Architecture

| Package                | Purpose                                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| `components/`          | All Vue components, one directory per component                                   |
| `types/`               | Shared TypeScript interfaces — `PlusColumn` is the central type                   |
| `hooks/`               | `useTable` (table state), `useLocale`                                             |
| `utils/`               | Built with unbuild — cookie, date, validate, storage, etc.                        |
| `constants/`           | Default values (e.g., `DefaultPageInfo`, `DefaultPageSizeList`)                   |
| `locale/`              | i18n language packs (zh-cn, en, ja, ko, zh-tw, zh-hk)                             |
| `theme-chalk/`         | SCSS theme — one `.scss` per component, built separately                          |
| `resolver/`            | `unplugin-vue-components` resolver for on-demand import                           |
| `plus-pro-components/` | Installer + public API entry — re-exports all components, hooks, types, constants |
| `play/`                | Dev playground Vite app                                                           |
| `eslint-config/`       | Shared ESLint config, published to npm                                            |
| `scripts/build/`       | Rollup-based build for components (ESM + CJS)                                     |

## Component Structure

Each component under `packages/components/<name>/` follows this layout:

- `index.ts` — barrel export: exports the component as a PascalCase const, the instance type, and types from `src/type.ts`
- `src/index.vue` — the component implementation (Vue SFC with `<script setup lang="ts">`)
- `src/type.ts` — component-specific TypeScript types (if needed)
- `style/index.ts` — imports Element Plus component styles + `@plus-pro-components/theme-chalk` SCSS
- `style/css.ts` — same as index.ts but for CSS distribution
- `__tests__/` — vitest tests using `@vue/test-utils` mount + JSX

The central shared type is `PlusColumn` in `packages/types/plus.ts`. It merges `CommonType` (shared across table/form/descriptions/search) with table-specific and form-specific column props. Config-based rendering is the core pattern: components accept a `columns: PlusColumn[]` prop where each column declares a `valueType` (e.g., `'input'`, `'select'`, `'date-picker'`, `'rate'`, `'switch'`) that maps to an editable or display form control.

## Build System

- Components: Rollup via `scripts/build/` — globs all `*.{js,ts,vue}` from components root, builds both ESM (`.mjs` to `dist/es/`) and CJS (`.js` to `dist/lib/`), with type declarations via `vite-plugin-dts`
- Utils & ESLint config: unbuild
- Theme: compiles SCSS to CSS via a custom build script in `packages/theme-chalk/build.ts`
- All builds must run before `pnpm dev` (enforced by `postinstall`)

## Playground

The `play/` app auto-generates nav and routes from component files via `gFiles.ts`. It runs on port 3000. Views in `packages/play/src/views/` demonstrate each component.

## Notes

- Node >= 18 required
- `element-plus` is a peer dependency (not bundled)
- Commit messages follow conventional commits via `cz-git`
- The `@external/` path alias in style files resolves to `element-plus` component styles

## other

- **Please keep the conversation in Chinese**
- **Please add comments in the generated code.**
