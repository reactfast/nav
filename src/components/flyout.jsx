import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useRef } from 'react'
import Link from 'next/link'

export default function Flyout({ item, onHover }) {
  const buttonRef = useRef(null)
  return (
    <Popover>
      {({ open }) => (
        <div
          className="relative"
          onMouseEnter={() => {
            if (onHover && !open) buttonRef.current?.click()
          }}
          onMouseLeave={() => {
            if (onHover && open) buttonRef.current?.click()
          }}
        >
          <div className="flex items-center gap-x-1">
            {item.useLink ? (
              <Link href={item.href} className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                {item.title}
              </Link>
            ) : (
              <span className="text-sm/6 font-semibold text-gray-900 dark:text-white">{item.title}</span>
            )}
            <PopoverButton
              ref={buttonRef}
              className="inline-flex items-center p-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label={`Open ${item.title} menu`}
            >
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
            </PopoverButton>
          </div>

          <PopoverPanel
            transition
            className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline outline-1 outline-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          >
            <div className="p-4">
              {item.subMenu.map((subItem) => (
                <div
                  key={subItem.title}
                  className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700">
                    {(() => {
                      const Icon = subItem.icon
                      if (!Icon) return null
                      if (React.isValidElement(Icon)) {
                        return React.cloneElement(Icon, {
                          className: 'size-6 text-gray-600 group-hover:text-primary',
                          'aria-hidden': true,
                        })
                      }
                      if (typeof Icon === 'function') {
                        const C = Icon
                        return <C aria-hidden className="size-6 text-gray-600 group-hover:text-primary" />
                      }
                      return null
                    })()}
                  </div>
                  <div className="flex-auto">
                    <a
                      href={subItem.href}
                      className="block font-semibold text-gray-900 dark:text-white"
                    >
                      {subItem.title}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {subItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:divide-white/10 dark:bg-gray-700/50">
              {item.ctas &&
                item.ctas.map((cta) => (
                  <a
                    key={cta.title}
                    href={cta.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700/50"
                  >
                    {(() => {
                      const Icon = cta.icon
                      if (!Icon) return null
                      if (React.isValidElement(Icon)) {
                        return React.cloneElement(Icon, {
                          className: 'size-5 flex-none text-gray-400',
                          'aria-hidden': true,
                        })
                      }
                      if (typeof Icon === 'function') {
                        const C = Icon
                        return <C aria-hidden className="size-5 flex-none text-gray-400" />
                      }
                      return null
                    })()}
                    {cta.title}
                  </a>
                ))}
            </div>
          </PopoverPanel>
        </div>
      )}
    </Popover>
  )
} // <- This closes the function properly
