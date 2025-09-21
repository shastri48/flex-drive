import { getUniqueColors, getUniqueMakes, vehiclesData } from '@/data/vehicles'
import { SortOption } from '@/types/vehicle'
import { searchAndFilterVehicles } from '@/utils/vehicleUtils'
import { useMemo, useState } from 'react'

export function useVehicleFilters(searchedZipCode: string | null) {
  const [selectedMake, setSelectedMake] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [selectedSort, setSelectedSort] = useState<SortOption | ''>('')
  const [selectedYear, setSelectedYear] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([20000, 70000])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique values for filters
  const uniqueMakes = useMemo(() => getUniqueMakes(), [])
  const uniqueColors = useMemo(() => getUniqueColors(), [])

  // Helper function to determine body type from model
  const getBodyType = (model: string): string => {
    const suvModels = ['RAV4', 'CR-V', 'X5', 'GLE', 'RX', 'MDX', 'QX60']
    const sportsModels = ['Mustang', 'Camaro']

    if (suvModels.includes(model)) return 'SUV'
    if (sportsModels.includes(model)) return 'Sports'
    return 'Sedan'
  }

  // Filter and sort vehicles based on current state
  const filteredVehicles = useMemo(() => {
    let vehicles = vehiclesData

    // Use the searchAndFilterVehicles function with all filters
    vehicles = searchAndFilterVehicles(vehiclesData, {
      zipCode: searchedZipCode || '',
      make: selectedMake !== 'all' ? selectedMake : undefined,
      color: selectedColor !== 'all' ? selectedColor : undefined,
      sortBy: selectedSort || undefined,
      searchQuery: searchQuery || undefined,
    })

    // Apply additional filters that aren't in the searchAndFilterVehicles function
    // Filter by year
    if (selectedYear.length > 0) {
      vehicles = vehicles.filter(vehicle => selectedYear.includes(vehicle.year))
    }

    // Filter by price range
    vehicles = vehicles.filter(
      vehicle =>
        vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    )

    // Filter by body type
    if (selectedBodyTypes.length > 0) {
      vehicles = vehicles.filter(vehicle =>
        selectedBodyTypes.includes(getBodyType(vehicle.model))
      )
    }

    return vehicles
  }, [
    searchedZipCode,
    selectedMake,
    selectedColor,
    selectedSort,
    selectedYear,
    priceRange,
    selectedBodyTypes,
    searchQuery,
  ])

  const handleClearFilters = () => {
    setSelectedMake('all')
    setSelectedColor('all')
    setSelectedSort('')
    setSelectedYear([])
    setPriceRange([20000, 70000])
    setSelectedBodyTypes([])
  }

  // Count active filters for mobile button
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedMake !== 'all') count++
    if (selectedColor !== 'all') count++
    if (selectedSort !== '') count++
    if (selectedYear.length > 0) count++
    if (selectedBodyTypes.length > 0) count++
    if (priceRange[0] !== 20000 || priceRange[1] !== 70000) count++
    return count
  }, [
    selectedMake,
    selectedColor,
    selectedSort,
    selectedYear,
    selectedBodyTypes,
    priceRange,
  ])

  return {
    // Filter state
    selectedMake,
    selectedColor,
    selectedSort,
    selectedYear,
    priceRange,
    selectedBodyTypes,
    searchQuery,

    // Filter setters
    setSelectedMake,
    setSelectedColor,
    setSelectedSort,
    setSelectedYear,
    setPriceRange,
    setSelectedBodyTypes,
    setSearchQuery,

    // Computed values
    uniqueMakes,
    uniqueColors,
    filteredVehicles,
    activeFiltersCount,

    // Actions
    handleClearFilters,
  }
}
