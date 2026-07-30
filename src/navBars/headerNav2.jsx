"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Flyout from "../components/flyout";
import FlyoutFull from "../components/flyoutFull";
import SimpleFlyout from "../components/simpleFlyout";

export default function DefaultNavBar({
  config,
  onScrolledChange,
  scrollThreshold = 10,
  quickSearchResults = [],
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof config?.onSearchOpenChange === "function") {
      config.onSearchOpenChange(searchOpen);
    }
    if (!searchOpen) {
      setSearchQuery("");
      if (typeof config?.onClearQuickResults === "function") {
        config.onClearQuickResults();
      }
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > scrollThreshold;
      setScrolled((prev) => {
        if (prev !== next) {
          if (typeof onScrolledChange === "function") {
            onScrolledChange(next);
          }
        }
        return next;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrolledChange, scrollThreshold]);

  return (
    <header
      className={`${config?.sticky ? "sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70" : "relative z-10"} isolate bg-white`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" aria-label={config.logoAlt || "Home"}>
            {config.logo ? (
              <img
                alt={config.logoAlt || "Logo"}
                src={config.logo}
                className={`w-auto transition-all duration-300 ${scrolled ? "h-8 md:h-14" : "h-12 md:h-20"}`}
              />
            ) : (
              <div
                className={`h-auto transition-all duration-300 ${scrolled ? "w-28" : "w-32"}`}
              >
                <h1
                  className={`transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"}`}
                >
                  {config.fallbackText || "<NovaNav>"}
                </h1>
              </div>
            )}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Desktop Navigation */}
          {config.menuItems.map((item) => {
            const type = item.type || (item.full ? "full" : "default");
            if (item.subMenu) {
              if (type === "full")
                return (
                  <FlyoutFull
                    key={item.id || item.title}
                    item={item}
                    onHover={item.onHover}
                  />
                );
              if (type === "simple")
                return (
                  <SimpleFlyout
                    key={item.id || item.title}
                    item={item}
                    onHover={item.onHover}
                  />
                );
              return (
                <Flyout
                  key={item.id || item.title}
                  item={item}
                  onHover={item.onHover}
                />
              );
            }
            return item.useLink ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.title}
              </a>
            );
          })}
        </PopoverGroup>

        <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end items-center">
          {config.search && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
            </button>
          )}
          {config.cta && (
            <a
              href={config.ctaBtnHref}
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {config.ctaTitle || "Sign up"}
            </a>
          )}
          {config.login && (
            <a
              href={config.loginHref}
              className="rounded-md flex items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 flex items-center"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      <Dialog open={searchOpen} onClose={setSearchOpen}>
        <div className="fixed inset-0 z-50 bg-black/30" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-base font-semibold text-gray-900">Search</h2>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                aria-label="Close search"
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
            <form
              className="mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (typeof config?.onSearch === "function") {
                  config.onSearch(searchQuery);
                }
                setSearchOpen(false);
              }}
            >
              <label htmlFor="site-search" className="sr-only">
                Search
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="site-search"
                  type="search"
                  placeholder="Search..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => {
                    const next = e.target.value;
                    setSearchQuery(next);
                    if (typeof config?.onSearchChange === "function") {
                      config.onSearchChange(next);
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  type="submit"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Search
                </button>
              </div>
            </form>

            {Array.isArray(quickSearchResults) &&
              quickSearchResults.length > 0 && (
                <div className="mt-4 divide-y divide-gray-200">
                  {quickSearchResults.map((raw, idx) => {
                    if (!raw || typeof raw !== "object") return null;
                    const title = raw.title || raw.q || raw.name || "Result";
                    const description =
                      raw.desc || raw.description || raw.summary || raw.a || "";
                    const maxTitle =
                      typeof config?.searchTitleMax === "number"
                        ? config.searchTitleMax
                        : 60;
                    const maxDesc =
                      typeof config?.searchDescMax === "number"
                        ? config.searchDescMax
                        : 100;
                    const titleShort =
                      typeof title === "string" && title.length > maxTitle
                        ? `${title.slice(0, maxTitle - 1)}…`
                        : title;
                    const descShort =
                      typeof description === "string" &&
                      description.length > maxDesc
                        ? `${description.slice(0, maxDesc - 1)}…`
                        : description;
                    const link =
                      typeof raw.link === "string" ? raw.link : undefined;
                    const isInternal =
                      typeof link === "string" && link.startsWith("/");

                    const content = (
                      <div className="flex items-start gap-3 py-3">
                        {raw?.icon ? (
                          <div className="mt-0.5 h-6 w-6 text-gray-500">
                            {raw.icon}
                          </div>
                        ) : raw?.image ? (
                          <img
                            src={raw.image}
                            alt={title || "result"}
                            className="mt-0.5 h-6 w-6 rounded object-cover"
                          />
                        ) : (
                          <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="mt-0.5 size-6 text-gray-400"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {titleShort}
                          </div>
                          {descShort ? (
                            <div className="text-sm text-gray-500 truncate">
                              {descShort}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );

                    if (!link) {
                      return (
                        <div key={idx} className="block hover:bg-gray-50">
                          {content}
                        </div>
                      );
                    }

                    if (isInternal) {
                      return (
                        <a
                          key={link || idx}
                          href={link}
                          className="block hover:bg-gray-50"
                          onClick={() => {
                            if (typeof config?.onBeginNavigate === "function")
                              config.onBeginNavigate();
                            if (
                              typeof config?.onClearQuickResults === "function"
                            )
                              config.onClearQuickResults();
                            setSearchOpen(false);
                          }}
                        >
                          {content}
                        </a>
                      );
                    }
                    return (
                      <a
                        key={link || idx}
                        href={link}
                        className="block hover:bg-gray-50"
                        onClick={() => {
                          if (typeof config?.onBeginNavigate === "function")
                            config.onBeginNavigate();
                          if (typeof config?.onClearQuickResults === "function")
                            config.onClearQuickResults();
                          setSearchOpen(false);
                        }}
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              )}
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label={config.logoAlt || "Home"}
            >
              {config.logo ? (
                <img
                  alt={config.logoAlt || "Logo"}
                  src={config.logo}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {config.fallbackText || "NEXGEN Roofing Systems"}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* check if menu item has sub menu */}

                {/* Regular Navigation Items. NOT SUP/FLYOUT MENUS */}
                {config.menuItems.map((item) =>
                  item.subMenu ? (
                    <Disclosure key={item.id} as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        {item.title}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...item.subMenu, ...(item.ctas || [])].map(
                          (subItem) => (
                            <DisclosureButton
                              key={subItem.title}
                              as="a"
                              href={subItem.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {subItem.title}
                            </DisclosureButton>
                          ),
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  ) : item.useLink ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <a
                      key={item.id}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.title}
                    </a>
                  ),
                )}
              </div>
              <div className="space-y-2 py-6">
                {config.cta && (
                  <a
                    href={config.ctaBtnHref}
                    className="-mx-3 block rounded-lg bg-gray-900 px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                  >
                    {config.ctaTitle || "Sign up"}
                  </a>
                )}

                {config.login && (
                  <a
                    href={config.loginHref}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
