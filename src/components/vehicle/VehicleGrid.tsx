import { Skeleton as LoadingSkeleton } from '@/components/ui'
import { Vehicle } from '@/types/vehicle'
import EmptyState from './EmptyState'
import VehicleCard from './VehicleCard'

interface VehicleGridProps {
  vehicles: Vehicle[]
  isLoading?: boolean
}

export default function VehicleGrid({
  vehicles,
  isLoading = false,
}: VehicleGridProps) {
  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (vehicles.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
