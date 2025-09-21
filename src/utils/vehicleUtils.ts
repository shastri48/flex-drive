import { SearchFilters, SortOption, Vehicle } from '@/types/vehicle'

export const validateZipCode = (zipCode: string): boolean => {
  // Basic US ZIP code validation (5 digits or 5+4 format)
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode.trim())
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat('en-US').format(mileage)
}

export const filterVehiclesByZipCode = (
  vehicles: Vehicle[],
  zipCode: string
): Vehicle[] => {
  if (!zipCode.trim()) return []
  return vehicles.filter(vehicle => vehicle.zipCode === zipCode.trim())
}

export const filterVehicles = (
  vehicles: Vehicle[],
  filters: SearchFilters
): Vehicle[] => {
  let filteredVehicles = filterVehiclesByZipCode(vehicles, filters.zipCode)

  if (filters.make && filters.make !== 'all') {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.make === filters.make
    )
  }

  if (filters.color && filters.color !== 'all') {
    filteredVehicles = filteredVehicles.filter(
      vehicle => vehicle.color === filters.color
    )
  }

  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim()
    filteredVehicles = filteredVehicles.filter(vehicle => {
      const searchableText =
        `${vehicle.make} ${vehicle.model} ${vehicle.trim} ${vehicle.year}`.toLowerCase()
      return searchableText.includes(query)
    })
  }

  return filteredVehicles
}

export const sortVehicles = (
  vehicles: Vehicle[],
  sortBy: SortOption
): Vehicle[] => {
  const sortedVehicles = [...vehicles]

  switch (sortBy) {
    case 'price-high':
      return sortedVehicles.sort((a, b) => b.price - a.price)
    case 'price-low':
      return sortedVehicles.sort((a, b) => a.price - b.price)
    case 'model':
      return sortedVehicles.sort((a, b) => a.model.localeCompare(b.model))
    default:
      return sortedVehicles
  }
}

export const searchAndFilterVehicles = (
  vehicles: Vehicle[],
  filters: SearchFilters
): Vehicle[] => {
  let result = filterVehicles(vehicles, filters)

  if (filters.sortBy) {
    result = sortVehicles(result, filters.sortBy)
  }

  return result
}

export const getVehicleDisplayName = (vehicle: Vehicle): string => {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`
}

export const generateVehicleImageAlt = (vehicle: Vehicle): string => {
  return `${getVehicleDisplayName(vehicle)} in ${vehicle.color}`
}
