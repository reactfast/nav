"use client";

import { useMemo, useState } from "react";
import { NavController } from "../NavController.jsx";
import {
  NewspaperIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const MOCK_ITEMS = [
  {
    title: "About ReactFast",
    description: "Learn what the design system and nav package include.",
    link: "/about",
    kind: "page",
  },
  {
    title: "Search with Sanity",
    description:
      "Example docs for plugging a Sanity-backed search endpoint in.",
    link: "/docs/search-with-sanity",
    kind: "guide",
  },
  {
    title: "Launch announcement",
    description: "Read the latest product update post.",
    link: "/blog/launch-announcement",
    kind: "post",
  },
  {
    title: "Homepage hero gallery",
    description: "Images used in the homepage marketing hero.",
    link: "/gallery/homepage-hero",
    kind: "gallery",
  },
  {
    title: "FAQ: search customization",
    description:
      "Common questions about controlling search outside the package.",
    link: "/faq/search-customization",
    kind: "faq",
  },
];

const ICONS_BY_KIND = {
  faq: QuestionMarkCircleIcon,
  post: NewspaperIcon,
  gallery: PhotoIcon,
};

function attachIcons(items) {
  return items.map((item) => {
    const Icon = ICONS_BY_KIND[item.kind];

    if (!Icon) {
      return item;
    }

    return {
      ...item,
      icon: <Icon aria-hidden="true" className="h-6 w-6 text-gray-400" />,
    };
  });
}

export default function NavAndSearchExample() {
  const [results, setResults] = useState([]);

  const baseConfig = useMemo(
    () => ({
      fallbackText: "ReactFast",
      sticky: true,
      cta: true,
      ctaTitle: "Get Started",
      ctaBtnHref: "/get-started",
      menuItems: [
        { id: "home", title: "Home", href: "/", useLink: true },
        { id: "docs", title: "Docs", href: "/docs", useLink: true },
        { id: "blog", title: "Blog", href: "/blog", useLink: true },
      ],
    }),
    [],
  );

  const handleSearchChange = async (query) => {
    const nextQuery = query.trim().toLowerCase();

    if (!nextQuery) {
      setResults([]);
      return;
    }

    const filtered = MOCK_ITEMS.filter((item) => {
      const haystack = `${item.title} ${item.description}`.toLowerCase();
      return haystack.includes(nextQuery);
    });

    setResults(attachIcons(filtered));
  };

  return (
    <NavController
      baseConfig={baseConfig}
      quickSearchResults={results}
      onSearchChange={handleSearchChange}
      onSearch={(query) => {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }}
      onClearQuickResults={() => setResults([])}
    />
  );
}
