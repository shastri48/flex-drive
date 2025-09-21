import { Button } from '@/components/ui'
import { Vehicle } from '@/types/vehicle'
import { useRouter } from 'next/navigation'

interface VehiclePriceProps {
  vehicle: Vehicle
}

export default function VehiclePrice({ vehicle }: VehiclePriceProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/vehicle/${vehicle.id}`)
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-base sm:text-lg font-bold text-gray-900">
          ${vehicle.price.toLocaleString()}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          ${Math.round(vehicle.price / 48)}/mo
        </p>
      </div>
      <Button
        size="sm"
        onClick={handleViewDetails}
        className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
      >
        View details
      </Button>
    </div>
  )
}
