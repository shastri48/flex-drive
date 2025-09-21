'use client'

import { SortOption } from '@/types/vehicle'
import Button from '../ui/Button'
import { CloseIcon } from '../ui/Icons'
import VehicleFilters from './VehicleFilters'

interface MobileFilterDialogProps {
  isOpen: boolean
  onClose: () => void
  makes: string[]
  colors: string[]
  selectedMake: string
  selectedColor: string
  selectedSort: SortOption | ''
  selectedYear: number[]
  priceRange: [number, number]
  selectedBodyTypes: string[]
  onMakeChange: (make: string) => void
  onColorChange: (color: string) => void
  onSortChange: (sort: SortOption | '') => void
  onYearChange: (years: number[]) => void
  onPriceRangeChange: (range: [number, number]) => void
  onBodyTypeChange: (bodyTypes: string[]) => void
  onClearFilters: () => void
  resultsCount: number
}

export default function MobileFilterDialog({
  isOpen,
  onClose,
  makes,
  colors,
  selectedMake,
  selectedColor,
  selectedSort,
  selectedYear,
  priceRange,
  selectedBodyTypes,
  onMakeChange,
  onColorChange,
  onSortChange,
  onYearChange,
  onPriceRangeChange,
  onBodyTypeChange,
  onClearFilters,
  resultsCount,
}: MobileFilterDialogProps) {
  if (!isOpen) return null

  const handleApplyFilters = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">
          <VehicleFilters
            makes={makes}
            colors={colors}
            selectedMake={selectedMake}
            selectedColor={selectedColor}
            selectedSort={selectedSort}
            selectedYear={selectedYear}
            priceRange={priceRange}
            selectedBodyTypes={selectedBodyTypes}
            onMakeChange={onMakeChange}
            onColorChange={onColorChange}
            onSortChange={onSortChange}
            onYearChange={onYearChange}
            onPriceRangeChange={onPriceRangeChange}
            onBodyTypeChange={onBodyTypeChange}
            onClearFilters={onClearFilters}
            resultsCount={resultsCount}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClearFilters} className="flex-1">
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Show {resultsCount} Results
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
