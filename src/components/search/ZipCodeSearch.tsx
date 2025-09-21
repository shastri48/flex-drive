'use client'

import { Button, Input, LoadingSpinner, SearchIcon } from '@/components/ui'
import { useEffect, useState } from 'react'

interface ZipCodeSearchProps {
  onSearch: (zipCode: string) => void
  isLoading: boolean
  error: string
  placeholder?: string
  showLabel?: boolean
  currentZipCode?: string
}

export default function ZipCodeSearch({
  onSearch,
  isLoading,
  error,
  placeholder = 'Enter ZIP code',
  showLabel = false,
  currentZipCode = '',
}: ZipCodeSearchProps) {
  const [zipCode, setZipCode] = useState(currentZipCode)

  // Update local state when currentZipCode prop changes
  useEffect(() => {
    if (currentZipCode && currentZipCode !== zipCode) {
      setZipCode(currentZipCode)
    }
  }, [currentZipCode, zipCode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipCode.trim()) {
      onSearch(zipCode.trim())
    }
  }

  const hasCurrentZipCode = currentZipCode && currentZipCode.trim() !== ''
  const displayPlaceholder = hasCurrentZipCode
    ? `Current: ${currentZipCode}`
    : placeholder

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="text"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          placeholder={displayPlaceholder}
          disabled={isLoading}
          error={error}
          label={showLabel ? 'ZIP Code' : undefined}
          leftIcon={<SearchIcon className="h-5 w-5 text-gray-400" />}
          className={
            hasCurrentZipCode && !zipCode ? 'bg-blue-50 border-blue-200' : ''
          }
          rightIcon={
            <Button
              type="submit"
              disabled={isLoading || !zipCode.trim()}
              size="sm"
              className="mr-1"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <LoadingSpinner className="-ml-1 mr-2 h-4 w-4" />
                  Searching...
                </div>
              ) : hasCurrentZipCode && !zipCode ? (
                'Change'
              ) : (
                'Search'
              )}
            </Button>
          }
        />
      </div>
    </form>
  )
}
