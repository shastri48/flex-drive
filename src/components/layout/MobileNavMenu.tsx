'use client'

import Button from '../ui/Button'
import { CloseIcon } from '../ui/Icons'

interface MobileNavMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNavMenu({ isOpen, onClose }: MobileNavMenuProps) {
  if (!isOpen) return null

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'How it works', href: '#' },
    { label: 'Log in', href: '#' },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <nav className="space-y-4">
            {menuItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-lg font-medium"
                onClick={onClose}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Additional Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
