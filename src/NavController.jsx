"use client";

import { useMemo, useState } from "react";
import DefaultNavBar from "./navBars/headerNav2.jsx";
import LoadingArea from "./components/loadingArea.jsx";

export function NavController({
  baseConfig, // shape and content of the nav, excluding search-related props
  quickSearchResults = [], // array of items to show in the quick search results flyout
  onSearchChange, // callback for when the search input value changes, receives the new value as an argument
  onSearch, // callback for when a search is submitted, receives the search query as an argument
  onSearchOpenChange,
  onClearQuickResults,
}) {
  const [navigating, setNavigating] = useState(false);

  const handleSearchChange = (value) => {
    if (typeof onSearchChange === "function") {
      onSearchChange(value);
    }
  };

  const handleSearch = (value) => {
    const q = (value || "").trim();
    if (!q) return;

    if (typeof onSearch === "function") {
      onSearch(q);
      return;
    }

    setNavigating(true);
    if (typeof window !== "undefined") {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  };

  const handleOpenChange = (open) => {
    if (typeof onSearchOpenChange === "function") {
      onSearchOpenChange(open);
    }

    if (!open && typeof onClearQuickResults === "function") {
      onClearQuickResults();
    }
  };

  const config = useMemo(
    () => ({
      ...baseConfig,
      search: true,
      onSearchChange: handleSearchChange,
      onSearch: handleSearch,
      onSearchOpenChange: handleOpenChange,
      onClearQuickResults,
      onBeginNavigate: () => setNavigating(true),
    }),
    [baseConfig, onClearQuickResults],
  );

  return (
    <>
      {navigating && (
        <div className="fixed inset-0 z-[60]">
          <LoadingArea />
        </div>
      )}
      <DefaultNavBar config={config} quickSearchResults={quickSearchResults} />
    </>
  );
}
