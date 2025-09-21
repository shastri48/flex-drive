'use client'

import { Modal } from '@/components/ui'
import { useState } from 'react'

interface ZipCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (zipCode: string) => void
  isLoading: boolean
  error: string
}

export default function ZipCodeModal({
  isOpen,
  onClose,
  onSearch,
  isLoading,
  error,
}: ZipCodeModalProps) {
  const [zipCode, setZipCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipCode.trim()) {
      onSearch(zipCode.trim())
    }
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        _position => {
          // For demo purposes, we'll use a default ZIP code
          // In a real app, you'd reverse geocode the coordinates
          setZipCode('90210')
        },
        error => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find cars near you
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Enter your ZIP code to see accurate availability and delivery
            options in your area.
          </p>
        </div>

        {/* ZIP Code Input */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              placeholder="60601"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
              maxLength={5}
            />
            <button
              type="button"
              onClick={handleLocateMe}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Locate me</span>
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </form>

        {/* Update Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!zipCode.trim() || isLoading}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </Modal>
  )
}
