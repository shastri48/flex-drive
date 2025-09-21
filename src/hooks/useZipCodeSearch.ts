import { vehiclesData } from '@/data/vehicles'
import { searchAndFilterVehicles } from '@/utils/vehicleUtils'
import { useState } from 'react'

export function useZipCodeSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleSearch = async (
    zipCode: string,
    setEnteredZipCode: (zipCode: string) => void,
    setSearchedZipCode: (zipCode: string) => void,
    resetFilters: () => void
  ) => {
    setIsLoading(true)
    setSearchError('')

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const results = searchAndFilterVehicles(vehiclesData, { zipCode })

    // Always keep the entered zip code for display purposes
    setEnteredZipCode(zipCode)

    if (results.length === 0) {
      setSearchError(`No vehicles found in ZIP code ${zipCode}`)
      setSearchedZipCode('')
    } else {
      setSearchedZipCode(zipCode)
      setSearchError('')
      // Reset filters when searching new ZIP code
      resetFilters()
    }

    setIsLoading(false)
  }

  return {
    isLoading,
    searchError,
    handleSearch,
  }
}
