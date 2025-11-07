## 🧭 @reactfast/nav

**Composable React navigation bars, headers, and footers.**

[![npm version](https://img.shields.io/npm/v/%40reactfast%2Fnav.svg)](https://www.npmjs.com/package/@reactfast/nav)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://github.com/jonathonmcclendon/RealFastNav/actions/workflows/build.yml/badge.svg)](https://github.com/jonathonmcclendon/RealFastNav/actions)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/jonathonmcclendon/RealFastNav/issues)

---

### Installation

```bash
npm install @reactfast/nav
# or
yarn add @reactfast/nav
```

Peer dependencies (not bundled): `react`, `react-dom`, `@headlessui/react`, `@heroicons/react`, `react-icons`.

---

### Quick Start (FastNav)

### FastNav (Default Navigation)

FastNav is a single component that renders a responsive navigation bar driven by a JSON-like config.

Note: FastNav uses `next/link`. Use in a Next.js project.

Usage

```jsx
import { FastNav } from "@reactfast/nav";

const config = { menuItems: [{ title: "Home", href: "/", useLink: true }] };

export default function Header() {
  return <FastNav config={config} />;
}
```

Concepts

- Menu items (top-level)

  ```jsx
  const config = {
    menuItems: [
      { title: "Home", href: "/", useLink: true },
      { title: "About", href: "/about", useLink: true },
      { title: "Contact", href: "/contact", useLink: true },
    ],
  };
  ```

- Submenus

  Add a `subMenu` array to any item for a flyout. Use `full: true` for a full-width panel; omit (or set `type: "simple"`) for a compact flyout.

  ```jsx
  const config = {
    menuItems: [
      {
        title: "Services",
        href: "/services",
        useLink: true,
        // full-width flyout
        full: true,
        subMenu: [
          { title: "Repair", href: "/services/repair", useLink: true },
          { title: "Install", href: "/services/install", useLink: true },
        ],
      },
    ],
  };
  ```

- Submenu CTAs (optional)

  Add a `ctas` array to append call-to-action links at the bottom of full-width flyouts.

  ```jsx
  const config = {
    menuItems: [
      {
        title: "Services",
        href: "/services",
        useLink: true,
        full: true,
        subMenu: [{ title: "Install", href: "/services/install", useLink: true }],
        ctas: [
          { title: "Call", href: "tel:0000000000" },
          { title: "Contact", href: "/contact" },
        ],
      },
    ],
  };
  ```

- Login and Top-level CTA (header right side)

  ```jsx
  const config = {
    login: true,
    loginHref: "/login",
    cta: true,
    ctaTitle: "Get Started",
    ctaBtnHref: "/signup",
  };
  ```

- Sticky header and brand

  ```jsx
  const config = {
    sticky: true,              // stick to top on scroll
    logo: "/logo.png",         // optional image logo
    logoAlt: "Brand",
    fallbackText: "Brand",     // text shown if no image
  };
  ```

- Search modal (optional)

  ```jsx
  const config = {
    search: true,
    // Optional event hooks:
    // onSearchOpenChange(open: boolean)
    // onSearch(query: string)
    // onSearchChange(query: string)
    // onClearQuickResults()
    // onBeginNavigate()
  };
  ```

---

### Features

- Responsive, accessible navigation built on Headless UI
- Dark/light variants and mobile-friendly menus
- Heroicons and React Icons support
- Tailwind-ready markup

---

### Contributing

We welcome pull requests and feature suggestions. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

### License

Licensed under the [MIT License](LICENSE). © 2025 [Jonathon McClendon](https://github.com/jonathonmcclendon)
