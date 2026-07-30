# Quickstart — Next.js (App Router)

This Quickstart shows a minimal Next.js setup that integrates the top max-width navigation bar via `NavController` (the integration component used in the repo). The example mirrors a working instance and demonstrates `baseConfig` with `menuItems`, `subMenu`, icons, `useLink`, and CTAs.

Prerequisites

- Node.js (16+ recommended)
- pnpm (or npm / yarn)

1. Create a new Next.js app (or use your existing project)

```bash
# with pnpm
pnpm create next-app@latest my-site -- --experimental-app
cd my-site
```

2. Install the package and peer deps

```bash
pnpm add @reactfast/nav @headlessui/react @heroicons/react react-icons
```

Note: Next.js already provides `react` and `react-dom`.

3. (Optional) Install Tailwind CSS if you want the example styles

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js` and include Tailwind in your global CSS as usual.

4. Add a `RootLayout` with `NavController` and a `baseConfig`

Create or edit `app/layout.jsx` (App Router) and add a config similar to the example below. This mirrors the working integration: icons come from `@heroicons/react/24/outline`, `menuItems` may include `subMenu`, `ctas`, and `useLink`.

```jsx
// app/layout.jsx
import NavController from "@reactfast/nav"; // or import '@/components/NavController' if using the repo's local component
import {
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  FunnelIcon,
  ArrowRightCircleIcon,
  UserGroupIcon,
  PhoneIcon as PhoneOutlineIcon,
} from "@heroicons/react/24/outline";

const example = {
  sticky: true,
  search: true,
  logo: "/logo.webp",
  fallbackText: "Acme Corp",
  logoAlt: "Acme Logo",
  cta: true,
  ctaTitle: "Contact",
  ctaBtnHref: "/help/contact",
  menuItems: [
    { title: "Home", href: "/", useLink: true },
    {
      title: "Services",
      href: "/services",
      useLink: true,
      full: true,
      onHover: true,
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
    { title: "About", href: "/about", useLink: true },
    { title: "FAQ", href: "/help/faq", useLink: true },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavController baseConfig={example} />
        {children}
      </body>
    </html>
  );
}
```

5. Run the dev server

```bash
pnpm dev
```

6. Notes & troubleshooting

- Use `useLink: true` for internal navigation so the component will render framework-native `<Link/>` (Next.js). If you pass `useLink: false`, the component will render a plain anchor `<a>` instead.
- Icons in the `menuItems` (for `icon` or `ctas`) can be JSX nodes — e.g. `<WrenchScrewdriverIcon />` — which the component will render.
- If you use local components instead of the published package (for example when developing inside the repo), import `NavController` from the local path: `import NavController from '@/components/NavController'`.

7. Next steps

- Customize the `example` config to match your site's structure and copy assets (logo, flyout images).
- If you want Tailwind styling like the examples, follow the Tailwind setup and include `@tailwind base; @tailwind components; @tailwind utilities;` in your global CSS.

If you want, I can also provide a minimal Vite + React Quickstart — tell me which you'd prefer next.
