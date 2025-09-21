import { Input, SearchIcon } from '@/components/ui'
import { SortOption } from '@/types/vehicle'

interface ResultsHeaderProps {
  resultsCount: number
  searchedZipCode?: string
  selectedSort: SortOption | ''
  onSortChange: (sort: SortOption | '') => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export default function ResultsHeader({
  resultsCount,
  searchedZipCode,
  selectedSort,
  onSortChange,
  searchQuery = '',
  onSearchChange,
}: ResultsHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6">
      {/* Mobile Layout - Two Lines */}
      <div className="block sm:hidden">
        {/* First Line - Results Count */}
        <div className="mb-3">
          <h1 className="text-lg font-medium text-gray-900">
            {resultsCount} results
            {searchedZipCode && (
              <span className="text-gray-600"> in {searchedZipCode}</span>
            )}
          </h1>
        </div>

        {/* Second Line - Search and Sort */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by make, model..."
              value={searchQuery}
              onChange={e => onSearchChange?.(e.target.value)}
              leftIcon={<SearchIcon />}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedSort}
              onChange={e => onSortChange(e.target.value as SortOption | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            >
              <option value="">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="model">Model: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Single Line */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-medium text-gray-900">
            {resultsCount} results
            {searchedZipCode && (
              <span className="text-gray-600"> in {searchedZipCode}</span>
            )}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by make, model..."
              value={searchQuery}
              onChange={e => onSearchChange?.(e.target.value)}
              leftIcon={<SearchIcon />}
              className="w-64"
            />
          </div>
          <select
            value={selectedSort}
            onChange={e => onSortChange(e.target.value as SortOption | '')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            <option value="">Sort by Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="model">Model: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
