import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useRef } from 'react'
import Link from 'next/link'

export default function SimpleFlyout({ item, onHover }) {
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
              <Link href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.title}
              </Link>
            ) : (
              <span className="text-sm/6 font-semibold text-gray-900">{item.title}</span>
            )}
            <PopoverButton
              ref={buttonRef}
              className="inline-flex items-center p-1 text-gray-700 hover:text-gray-900"
              aria-label={`Open ${item.title} menu`}
            >
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
            </PopoverButton>
          </div>

          <PopoverPanel
            transition
            className="absolute left-1/2 z-10 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <ul className="space-y-1">
              {item.subMenu?.map((sub) => (
                <li key={sub.title} className="group">
                  <Link
                    href={sub.href}
                    className="flex items-center rounded-md px-3 py-2 text-sm text-gray-400 transition-colors duration-300 group-hover:text-black"
                  >
                    {(() => {
                      const Icon = sub.icon
                      if (!Icon) return <ChevronRightIcon className="mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary" />
                      if (React.isValidElement(Icon)) {
                        return React.cloneElement(Icon, {
                          className: 'mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary',
                          'aria-hidden': true,
                        })
                      }
                      if (typeof Icon === 'function') {
                        const C = Icon
                        return <C aria-hidden className="mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary" />
                      }
                      return null
                    })()}
                    <span>{sub.title}</span>
                  </Link>
                </li>
              ))}
              {item.ctas?.map((cta) => (
                <li key={cta.title} className="group">
                  <a
                    href={cta.href}
                    className="flex items-center rounded-md px-3 py-2 text-sm text-gray-400 transition-colors duration-300 group-hover:text-black"
                  >
                    {(() => {
                      const Icon = cta.icon
                      if (!Icon) return <ChevronRightIcon className="mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary" />
                      if (React.isValidElement(Icon)) {
                        return React.cloneElement(Icon, {
                          className: 'mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary',
                          'aria-hidden': true,
                        })
                      }
                      if (typeof Icon === 'function') {
                        const C = Icon
                        return <C aria-hidden className="mr-2 h-5 w-5 text-gray-500 transition-all duration-300 group-hover:mr-3 group-hover:text-primary" />
                      }
                      return null
                    })()}
                    <span>{cta.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </PopoverPanel>
        </div>
      )}
    </Popover>
  )
}


