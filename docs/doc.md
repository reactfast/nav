# Introduction

Welcome to RealFastNav — a small, composable React library of navigation bars, headers, footers, and sidebars built for modern React apps. RealFastNav provides accessible, Headless UI–friendly building blocks so you can compose responsive navigation patterns quickly and consistently with your UI system (Tailwind, CSS Modules, styled-components, etc.).

## Key goals

- Compose small, focused components (headers, footers, flyouts, sidebars).
- Play nicely with Headless UI and common icon libraries.
- Keep markup and accessibility best practices simple and explicit.
- Work with modern React (hooks + function components).

## Who this library is for

- React teams who want reusable navigation patterns without heavy opinionated styling.
- Projects using Tailwind, Headless UI, or component-driven design systems.
- Developers who want accessible navigation primitives that are easy to customize.

## Key Features

- Composable navigation primitives: headers, nav bars, flyouts, sidebars, and footers.
- Built to integrate with `@headlessui/react`, `@heroicons/react`, and `react-icons`.
- Minimal styling opinion — you control the UI (Tailwind-friendly).
- Accessibility-minded defaults (keyboard navigation, proper semantics).
- Lightweight and focused: small API surface for easy composition.

## Compatibility

- React >= 18.0.0
- Works well with bundlers like Vite and with server frameworks such as Next.js.
- Peer dependencies (examples): `@headlessui/react`, `@heroicons/react`, `react-icons`.

## Core Concepts

- Small, single-responsibility components (e.g., `Header`, `LeftNav`, `RightNav`, `Footer`, `Flyout`).
- Composition over configuration: place components into your layout and style them.
- Headless UI integration for accessible interactive pieces (popovers, menus).
- Minimal CSS so you can use your chosen styling approach.

## Next.js usage example

Below is a representative (working) Next.js integration pattern that mirrors a real app using this package. It shows how to define a `baseConfig` object with `menuItems` (including `subMenu`, `ctas`, `useLink`, and JSX icons) and render `NavController` at the top of your layout.

```jsx
// app/layout.jsx (Next.js)
import { Roboto } from "next/font/google";
import NavController from "@/components/NavController";
import {
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  FunnelIcon,
  ArrowRightCircleIcon,
  UserGroupIcon,
  MapPinIcon as MapPinOutlineIcon,
  PhoneIcon as PhoneOutlineIcon,
} from "@heroicons/react/24/outline";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

const example = {
  sticky: true,
  search: true,
  logo: "/logo.webp",
  fallbackText: "Acme Corp",
  logoAlt: "Acme Logo",
  login: false,
  loginHref: "/login",
  cta: true,
  ctaTitle: "Contact",
  ctaBtnHref: "/help/contact",
  menuItems: [
    { title: "Home", href: "/", useLink: false },
    {
      title: "Services",
      href: "/services",
      useLink: true,
      onHover: true,
      full: true,
      subMenu: [
        {
          title: "Featured Project",
          href: "/gallery",
          useLink: true,
          image: "/imgFlyout.jpg",
          imageAlt: "Featured",
          description: "See a recent project.",
        },
        {
          title: "Roof Repair",
          href: "/services/roof-repair",
          useLink: true,
          icon: <WrenchScrewdriverIcon />,
          description: "Fix leaks and storm damage.",
        },
        {
          title: "Roof Replacement",
          href: "/services/roof-replacement",
          useLink: true,
          icon: <HomeModernIcon />,
          description: "Full tear-offs and installs.",
        },
      ],
      ctas: [
        {
          title: "Call Now",
          href: "tel:8178088026",
          icon: <PhoneOutlineIcon />,
        },
        {
          title: "Contact sales",
          href: "/help/contact",
          icon: <ChatBubbleLeftRightIcon />,
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      useLink: true,
      onHover: true,
      subMenu: [
        {
          title: "Company",
          href: "/about/company",
          useLink: true,
          icon: <BuildingOffice2Icon />,
        },
      ],
    },
    { title: "FAQ", href: "/help/faq", useLink: true },
    { title: "Gallery", href: "/gallery", useLink: true },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.variable}`}>
        <NavController baseConfig={example} />
        {children}
      </body>
    </html>
  );
}
```

Notes about this pattern:

- `NavController` is the canonical integration component in this repository; pass your site configuration via `baseConfig`.
- `menuItems` accepts plain objects and may include React nodes (e.g., Heroicons JSX) on `icon` or `image` fields — these are rendered by the flyout/menu templates.
- Set `useLink: true` when you want the component to use your framework's `Link` component (Next.js) for internal navigation; `useLink: false` will render a plain anchor.
- The example shows `ctas` inside a `subMenu` (call-to-action items rendered with icons).

This example mirrors a working instance and will render the top max-width bar, mobile drawer, search modal, and flyout menus you see in the demo app.

# Introduction

RealFastNav is a lightweight React package that provides a single, customizable top navigation bar — a centered, max-width "top bar" component intended to be dropped into applications and sites. The component implements common navigation concerns (responsive layout, mobile menu drawer, searchable modal, menu items with optional submenus/flyouts, and optional CTA/login links) while remaining styling-agnostic so you can apply your own CSS or Tailwind utilities.

This document describes the top bar usage and configuration surface.

## Key goals

- Provide a single, well-crafted top navigation bar that covers most site header needs.
- Keep markup accessible by using Headless UI primitives for interactive parts.
- Keep styling minimal so teams can adopt their own design system (Tailwind, CSS Modules, styled-components).

## What the top bar includes

- Centered, max-width top navigation layout (logo at left, menu in the center, actions on the right).
- Responsive mobile drawer with grouped menu items and submenus.
- Search modal with quick-result rendering and hooks for custom search behavior.
- Configurable CTA button and login link.
- Sticky mode to pin the bar to the top with a subtle backdrop blur.

## Where the implementation lives

The primary implementation is in `src/navBars/headerNav2.jsx`. That component is the intended entry point for the top bar and demonstrates the full feature set in this package.

## Configuration (props)

The top bar is configured via a `config` object. Common keys:

- `logo` (string): image `src` for the logo.
- `logoAlt` (string): alt text for the logo image.
- `fallbackText` (string): text shown when no logo is provided.
- `sticky` (boolean): enable sticky header behavior.
- `search` (boolean): enable search button/modal.
- `cta` (boolean): show CTA button.
- `ctaTitle` / `ctaBtnHref` (string): CTA label and target URL.
- `login` (boolean) / `loginHref` (string): show login link and target.
- `menuItems` (array): navigation entries. Each item can be a simple link or include `subMenu` (array) for disclosure/flyout menus. Item example:

```js
{
  id: 'home',
  title: 'Home',
  href: '/',
  useLink: true, // use framework Link when available
}

// submenu example
{
  id: 'products',
  title: 'Products',
  subMenu: [ { title: 'A', href: '/a' }, { title: 'B', href: '/b' } ],
}
```

## Callback hooks

The component supports callbacks for integration with app behavior:

- `onSearch(query)` — called when a search form is submitted.
- `onSearchChange(query)` — called as the user types in the search input.
- `onSearchOpenChange(open)` — called when the search modal opens/closes.
- `onClearQuickResults()` — called when quick results should be cleared.
- `onBeginNavigate()` — called just before a navigation triggered from the search results.
- `onScrolledChange(scrolled)` — called when header becomes scrolled (useful for changing surrounding app state).

## Minimal usage example

Import the top-bar component (replace the import with your app's path or package export):

```jsx
import DefaultNavBar from "@reactfast/nav"; // or import from local path

const config = {
  logo: "/logo.svg",
  logoAlt: "Acme",
  fallbackText: "Acme",
  sticky: true,
  search: true,
  cta: true,
  ctaTitle: "Sign up",
  ctaBtnHref: "/signup",
  login: true,
  loginHref: "/login",
  menuItems: [
    { id: "home", title: "Home", href: "/", useLink: true },
    {
      id: "products",
      title: "Products",
      subMenu: [{ title: "A", href: "/a" }],
    },
  ],
};

export default function Page() {
  return <DefaultNavBar config={config} />;
}
```

## Styling notes

- The top bar uses unopinionated utility classes in the examples (Tailwind), but you can replace or extend those classes.
- To customize spacing or colors, add/override class names on the component or wrap it in a styled container.

## Accessibility & Integration

- Interactive behaviors (dialogs, disclosures, popovers) use `@headlessui/react` for keyboard and focus management.
- For Next.js or other frameworks, prefer framework-native link components when `useLink` is enabled on menu items.

## Next steps

- See `docs/installation.md` for install instructions.
- The `Quickstart` doc will provide a step-by-step example app (choose Vite or Next.js).
