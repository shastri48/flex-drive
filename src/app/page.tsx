'use client'

import { ResultsHeader } from '@/components/common'
import { VehicleFilters } from '@/components/filters'
import MobileFilterDialog from '@/components/filters/MobileFilterDialog'
import { Header } from '@/components/layout'
import { ZipCodeModal } from '@/components/search'
import Button from '@/components/ui/Button'
import { FilterIcon } from '@/components/ui/Icons'
import { VehicleGrid } from '@/components/vehicle'
import { useZipCode } from '@/contexts/ZipCodeContext'
import { useVehicleFilters } from '@/hooks/useVehicleFilters'
import { useZipCodeSearch } from '@/hooks/useZipCodeSearch'
import { useState } from 'react'

export default function Home() {
  const {
    searchedZipCode,
    setSearchedZipCode,
    setEnteredZipCode,
    showZipCodePopup,
    setShowZipCodePopup,
  } = useZipCode()

  const [, setShowAllCars] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Use custom hooks for cleaner code
  const {
    selectedMake,
    selectedColor,
    selectedSort,
    selectedYear,
    priceRange,
    selectedBodyTypes,
    searchQuery,
    setSelectedMake,
    setSelectedColor,
    setSelectedSort,
    setSelectedYear,
    setPriceRange,
    setSelectedBodyTypes,
    setSearchQuery,
    uniqueMakes,
    uniqueColors,
    filteredVehicles,
    activeFiltersCount,
    handleClearFilters,
  } = useVehicleFilters(searchedZipCode)

  const { isLoading, searchError, handleSearch } = useZipCodeSearch()

  const resetFilters = () => {
    setSelectedMake('all')
    setSelectedColor('all')
    setSelectedSort('')
  }

  const handleZipCodeSubmit = (zipCode: string) => {
    setShowZipCodePopup(false)
    if (zipCode.trim()) {
      handleSearch(zipCode, setEnteredZipCode, setSearchedZipCode, resetFilters)
    }
  }

  const handleZipCodeDeny = () => {
    setShowZipCodePopup(false)
    setShowAllCars(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ZIP Code Modal */}
      <ZipCodeModal
        isOpen={showZipCodePopup}
        onClose={handleZipCodeDeny}
        onSearch={handleZipCodeSubmit}
        isLoading={isLoading}
        error={searchError}
      />

      {/* Mobile Filter Dialog */}
      <MobileFilterDialog
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        makes={uniqueMakes}
        colors={uniqueColors}
        selectedMake={selectedMake}
        selectedColor={selectedColor}
        selectedSort={selectedSort}
        selectedYear={selectedYear}
        priceRange={priceRange}
        selectedBodyTypes={selectedBodyTypes}
        onMakeChange={setSelectedMake}
        onColorChange={setSelectedColor}
        onSortChange={setSelectedSort}
        onYearChange={setSelectedYear}
        onPriceRangeChange={setPriceRange}
        onBodyTypeChange={setSelectedBodyTypes}
        onClearFilters={handleClearFilters}
        resultsCount={filteredVehicles.length}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <ResultsHeader
          resultsCount={filteredVehicles.length}
          searchedZipCode={searchedZipCode}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setIsMobileFilterOpen(true)}
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 bg-white hover:bg-gray-50"
          >
            <FilterIcon className="w-5 h-5" />
            <span>
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </span>
          </Button>
        </div>

        {/* Content Layout */}
        <div className="flex gap-6">
          {/* Filters Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <VehicleFilters
              makes={uniqueMakes}
              colors={uniqueColors}
              selectedMake={selectedMake}
              selectedColor={selectedColor}
              selectedSort={selectedSort}
              selectedYear={selectedYear}
              priceRange={priceRange}
              selectedBodyTypes={selectedBodyTypes}
              onMakeChange={setSelectedMake}
              onColorChange={setSelectedColor}
              onSortChange={setSelectedSort}
              onYearChange={setSelectedYear}
              onPriceRangeChange={setPriceRange}
              onBodyTypeChange={setSelectedBodyTypes}
              onClearFilters={handleClearFilters}
              resultsCount={filteredVehicles.length}
            />
          </aside>

          {/* Vehicle Grid */}
          <div className="flex-1">
            <VehicleGrid vehicles={filteredVehicles} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}
