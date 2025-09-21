export interface Vehicle {
  id: string
  make: string
  model: string
  trim: string
  year: number
  color: string
  mileage: number
  price: number
  image: string
  zipCode: string
}

export interface FilterOptions {
  make: string
  color: string
}

export type SortOption = 'price-high' | 'price-low' | 'model'

export interface SearchFilters {
  zipCode: string
  make?: string
  color?: string
  sortBy?: SortOption
  searchQuery?: string
}
