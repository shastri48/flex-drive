import {
  validateZipCode,
  formatPrice,
  formatMileage,
  filterVehiclesByZipCode,
  filterVehicles,
  sortVehicles,
  searchAndFilterVehicles,
  getVehicleDisplayName,
  generateVehicleImageAlt,
} from '../vehicleUtils'
import { Vehicle, SearchFilters } from '@/types/vehicle'

// Mock vehicle data for testing
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2023,
    color: 'White',
    mileage: 15000,
    price: 28500,
    image: '/images/toyota-camry.jpg',
    zipCode: '10001',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    year: 2022,
    color: 'Black',
    mileage: 22000,
    price: 26800,
    image: '/images/honda-accord.jpg',
    zipCode: '10001',
  },
  {
    id: '3',
    make: 'BMW',
    model: '3 Series',
    trim: '330i',
    year: 2023,
    color: 'Blue',
    mileage: 8000,
    price: 42000,
    image: '/images/bmw-3series.jpg',
    zipCode: '90210',
  },
]

describe('vehicleUtils', () => {
  describe('validateZipCode', () => {
    it('should validate correct 5-digit ZIP codes', () => {
      expect(validateZipCode('12345')).toBe(true)
      expect(validateZipCode('90210')).toBe(true)
      expect(validateZipCode('00001')).toBe(true)
    })

    it('should validate correct ZIP+4 codes', () => {
      expect(validateZipCode('12345-6789')).toBe(true)
      expect(validateZipCode('90210-1234')).toBe(true)
    })

    it('should reject invalid ZIP codes', () => {
      expect(validateZipCode('1234')).toBe(false) // Too short
      expect(validateZipCode('123456')).toBe(false) // Too long
      expect(validateZipCode('abcde')).toBe(false) // Letters
      expect(validateZipCode('12345-67890')).toBe(false) // Invalid ZIP+4
      expect(validateZipCode('')).toBe(false) // Empty
      expect(validateZipCode('12-345')).toBe(false) // Wrong format
    })

    it('should handle whitespace', () => {
      expect(validateZipCode(' 12345 ')).toBe(true)
      expect(validateZipCode(' 12345-6789 ')).toBe(true)
    })
  })

  describe('formatPrice', () => {
    it('should format prices correctly', () => {
      expect(formatPrice(28500)).toBe('$28,500')
      expect(formatPrice(1000)).toBe('$1,000')
      expect(formatPrice(999)).toBe('$999')
      expect(formatPrice(1000000)).toBe('$1,000,000')
    })

    it('should handle zero and negative values', () => {
      expect(formatPrice(0)).toBe('$0')
      expect(formatPrice(-1000)).toBe('-$1,000')
    })
  })

  describe('formatMileage', () => {
    it('should format mileage with commas', () => {
      expect(formatMileage(15000)).toBe('15,000')
      expect(formatMileage(1000)).toBe('1,000')
      expect(formatMileage(999)).toBe('999')
      expect(formatMileage(1000000)).toBe('1,000,000')
    })

    it('should handle zero mileage', () => {
      expect(formatMileage(0)).toBe('0')
    })
  })

  describe('filterVehiclesByZipCode', () => {
    it('should filter vehicles by ZIP code', () => {
      const result = filterVehiclesByZipCode(mockVehicles, '10001')
      expect(result).toHaveLength(2)
      expect(result.every(v => v.zipCode === '10001')).toBe(true)
    })

    it('should return empty array for non-existent ZIP code', () => {
      const result = filterVehiclesByZipCode(mockVehicles, '99999')
      expect(result).toHaveLength(0)
    })

    it('should return empty array for empty ZIP code', () => {
      const result = filterVehiclesByZipCode(mockVehicles, '')
      expect(result).toHaveLength(0)
    })

    it('should handle whitespace in ZIP code', () => {
      const result = filterVehiclesByZipCode(mockVehicles, ' 10001 ')
      expect(result).toHaveLength(2)
    })
  })

  describe('filterVehicles', () => {
    it('should filter by ZIP code only', () => {
      const filters: SearchFilters = { zipCode: '10001' }
      const result = filterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(2)
    })

    it('should filter by ZIP code and make', () => {
      const filters: SearchFilters = { zipCode: '10001', make: 'Toyota' }
      const result = filterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(1)
      expect(result[0].make).toBe('Toyota')
    })

    it('should filter by ZIP code and color', () => {
      const filters: SearchFilters = { zipCode: '10001', color: 'Black' }
      const result = filterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(1)
      expect(result[0].color).toBe('Black')
    })

    it('should filter by all criteria', () => {
      const filters: SearchFilters = {
        zipCode: '10001',
        make: 'Honda',
        color: 'Black',
      }
      const result = filterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(1)
      expect(result[0].make).toBe('Honda')
      expect(result[0].color).toBe('Black')
    })

    it('should ignore "all" filter values', () => {
      const filters: SearchFilters = {
        zipCode: '10001',
        make: 'all',
        color: 'all',
      }
      const result = filterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(2)
    })
  })

  describe('sortVehicles', () => {
    it('should sort by price high to low', () => {
      const result = sortVehicles(mockVehicles, 'price-high')
      expect(result[0].price).toBe(42000)
      expect(result[1].price).toBe(28500)
      expect(result[2].price).toBe(26800)
    })

    it('should sort by price low to high', () => {
      const result = sortVehicles(mockVehicles, 'price-low')
      expect(result[0].price).toBe(26800)
      expect(result[1].price).toBe(28500)
      expect(result[2].price).toBe(42000)
    })

    it('should sort by model alphabetically', () => {
      const result = sortVehicles(mockVehicles, 'model')
      expect(result[0].model).toBe('3 Series')
      expect(result[1].model).toBe('Accord')
      expect(result[2].model).toBe('Camry')
    })

    it('should not modify original array', () => {
      const original = [...mockVehicles]
      sortVehicles(mockVehicles, 'price-high')
      expect(mockVehicles).toEqual(original)
    })
  })

  describe('searchAndFilterVehicles', () => {
    it('should combine filtering and sorting', () => {
      const filters: SearchFilters = {
        zipCode: '10001',
        sortBy: 'price-high',
      }
      const result = searchAndFilterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(2)
      expect(result[0].price).toBe(28500) // Higher price first
      expect(result[1].price).toBe(26800)
    })

    it('should filter and sort with all criteria', () => {
      const filters: SearchFilters = {
        zipCode: '10001',
        make: 'Toyota',
        sortBy: 'model',
      }
      const result = searchAndFilterVehicles(mockVehicles, filters)
      expect(result).toHaveLength(1)
      expect(result[0].make).toBe('Toyota')
    })
  })

  describe('getVehicleDisplayName', () => {
    it('should format vehicle display name correctly', () => {
      const vehicle = mockVehicles[0]
      const result = getVehicleDisplayName(vehicle)
      expect(result).toBe('2023 Toyota Camry LE')
    })
  })

  describe('generateVehicleImageAlt', () => {
    it('should generate proper alt text', () => {
      const vehicle = mockVehicles[0]
      const result = generateVehicleImageAlt(vehicle)
      expect(result).toBe('2023 Toyota Camry LE in White')
    })
  })
})
