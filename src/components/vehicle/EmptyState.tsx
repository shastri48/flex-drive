import { EmptyStateIcon } from '@/components/ui'

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <EmptyStateIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No vehicles found
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We couldn&apos;t find any vehicles matching your search criteria. Try
        adjusting your filters or searching in a different ZIP code.
      </p>
    </div>
  )
}
