# Installation

This document explains how to add `@reactfast/nav` to your project and how to set up a local development environment for working on the library.

## Install the package

Choose your package manager:

```bash
# npm
npm install @reactfast/nav

# pnpm
pnpm add @reactfast/nav

# yarn
yarn add @reactfast/nav
```

The package is published as `@reactfast/nav` on npm. If you need a specific version, append `@x.y.z` (for example `@reactfast/nav@0.2.19`).

## Peer dependencies

`@reactfast/nav` declares several peer dependencies. Make sure your project provides these (install them if necessary):

```bash
# React and React DOM (required)
npm install react react-dom

# Optional/commonly used integrations
npm install @headlessui/react @heroicons/react react-icons

# If using with Next.js
npm install next
```

Adjust the command for `pnpm` or `yarn` as needed.

If you see warnings about unmet peer dependencies during install, install the missing peers in your app (not in the published package).

## Development setup (working on the library locally)

To run the library locally, build, or test examples in this repo, follow these steps.

1. Clone the repo and change into it (if you haven't already):

```bash
git clone https://github.com/jonathonmcclendon/RealFastNav.git
cd RealFastNav
```

2. Install dependencies (this repo uses `pnpm` by default; `npm`/`yarn` will also work):

```bash
pnpm install
```

3. Run the dev server to preview example components (uses Vite):

```bash
pnpm dev
```

4. Build the library for publishing:

```bash
pnpm build
```

## Publishing (maintainers)

The repo contains npm scripts to bump version, build, and publish. Example scripts in `package.json`:

```json
"release:patch": "npm version patch --no-git-tag-version && pnpm build && npm publish --access public",
"release:minor": "npm version minor --no-git-tag-version && pnpm build && npm publish --access public",
"release:major": "npm version major --no-git-tag-version && pnpm build && npm publish --access public"
```

To publish a patch release locally (example):

```bash
pnpm run release:patch
```

Note: publishing requires an npm account and correct registry/auth configuration.

## Styling and CSS frameworks

RealFastNav is intentionally unopinionated about styling. Examples use Tailwind utility classes, but you can integrate the components with any styling approach.

If you use Tailwind, ensure Tailwind is configured in your app. No additional runtime CSS is required from the library.

## Using with Next.js

Components are standard React components and work with Next.js. When using server-side rendering, treat interactive parts (flyouts, popovers) the same as other client components — use client-only rendering where appropriate (Next.js 13 app router `"use client"`).

## Troubleshooting

- Missing peer dependency warnings: install the listed peer in your application (not inside `node_modules` of the library).
- Build issues: run `pnpm build` locally and inspect the Vite output. Ensure your Node.js version matches the project's requirements.
- Publishing errors: verify `npm whoami` and registry access; ensure `publishConfig.access` is `public` for scoped packages.

## Example: quick install + minimal usage

```bash
pnpm add @reactfast/nav @headlessui/react @heroicons/react react-icons
```

Then in your app:

```jsx
import { Header, LeftNav, RightNav, Footer } from "@reactfast/nav";

export default function Page() {
  return (
    <>
      <Header>
        <LeftNav>...</LeftNav>
        <div className="mx-auto">Site</div>
        <RightNav>...</RightNav>
      </Header>
      <main>...</main>
      <Footer>...</Footer>
    </>
  );
}
```

## Next steps

- See `docs/doc.md` (Introduction) for conceptual overview.
- Follow the `Quickstart` doc (coming next) for a step-by-step example project.
