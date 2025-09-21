'use client'

import {
  Button,
  CheckboxFilter,
  Accordion as FilterSection,
  RangeSlider as PriceRangeFilter,
  RadioFilter,
} from '@/components/ui'
import { SortOption } from '@/types/vehicle'

interface VehicleFiltersProps {
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

export default function VehicleFilters({
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
  onSortChange: _onSortChange,
  onYearChange,
  onPriceRangeChange,
  onBodyTypeChange,
  onClearFilters,
  resultsCount: _resultsCount,
}: VehicleFiltersProps) {
  const hasActiveFilters =
    selectedMake !== 'all' ||
    selectedColor !== 'all' ||
    selectedSort !== '' ||
    selectedYear.length > 0 ||
    selectedBodyTypes.length > 0 ||
    priceRange[0] !== 20000 ||
    priceRange[1] !== 70000

  // Prepare options for filters
  const makeOptions = [
    { value: 'all', label: 'All Makes' },
    ...makes.map(make => ({ value: make, label: make })),
  ]

  const colorOptions = [
    { value: 'all', label: 'All Colors' },
    ...colors.map(color => ({
      value: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
    })),
  ]

  const bodyTypeOptions = [
    { value: 'SUV', label: 'SUV' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Sports', label: 'Sports' },
  ]

  const yearOptions = [
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ]

  const handleYearChange = (years: string[]) => {
    onYearChange(years.map(year => parseInt(year)))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
        {/* Make Section */}
        <FilterSection title="Make" isExpanded={selectedColor !== 'all'}>
          <RadioFilter
            name="make"
            options={makeOptions}
            selectedValue={selectedMake}
            onChange={onMakeChange}
          />
        </FilterSection>

        {/* Color Section */}
        <FilterSection title="Color" isExpanded={selectedColor !== 'all'}>
          <RadioFilter
            name="color"
            options={colorOptions}
            selectedValue={selectedColor}
            onChange={onColorChange}
          />
        </FilterSection>

        {/* Price Range Section */}
        <FilterSection
          title="Price range"
          isExpanded={priceRange[0] !== 20000 || priceRange[1] !== 70000}
        >
          <PriceRangeFilter
            min={20000}
            max={70000}
            value={priceRange}
            onChange={onPriceRangeChange}
            step={5000}
          />
        </FilterSection>

        {/* Body Type Section */}
        <FilterSection
          title="Body type"
          isExpanded={selectedBodyTypes.length > 0}
        >
          <CheckboxFilter
            options={bodyTypeOptions}
            selectedValues={selectedBodyTypes}
            onChange={onBodyTypeChange}
          />
        </FilterSection>

        {/* Model Year Section */}
        <FilterSection title="Model year" isExpanded={selectedYear.length > 0}>
          <CheckboxFilter
            options={yearOptions}
            selectedValues={selectedYear.map(year => year.toString())}
            onChange={handleYearChange}
          />
        </FilterSection>
      </div>
    </div>
  )
}
