'use client'

import { CurrentZipDisplay } from '@/components/search'
import { MenuIcon } from '@/components/ui/Icons'
import { useZipCode } from '@/contexts/ZipCodeContext'
import { useState } from 'react'
import MobileNavMenu from './MobileNavMenu'

export default function Header() {
  const { enteredZipCode, setShowZipCodePopup } = useZipCode()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and ZIP Code */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    FlexDrive
                  </span>
                </div>
              </div>

              {/* ZIP Code Display - Hidden on mobile */}
              <div className="hidden sm:block">
                <CurrentZipDisplay
                  zipCode={enteredZipCode}
                  onChangeLocation={() => setShowZipCodePopup(true)}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                How it works
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Log in
              </button>
            </div>

            {/* Mobile ZIP Code Display */}
            <div className="flex items-center space-x-3 sm:hidden">
              <CurrentZipDisplay
                zipCode={enteredZipCode}
                onChangeLocation={() => setShowZipCodePopup(true)}
              />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop ZIP Code and Menu Button */}
            <div className="hidden sm:flex md:hidden items-center space-x-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* ZIP Code Warning - Show when no zip code is selected */}
        {!enteredZipCode && (
          <div className="bg-yellow-50 border-b border-yellow-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-2">
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-yellow-800 font-medium">
                      Please select your ZIP code to see available vehicles in
                      your area
                    </span>
                    <button
                      onClick={() => setShowZipCodePopup(true)}
                      className="ml-2 text-sm text-yellow-900 underline hover:text-yellow-700 font-medium"
                    >
                      Select ZIP Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Menu */}
      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
