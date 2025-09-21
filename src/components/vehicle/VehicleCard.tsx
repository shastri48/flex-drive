import { Vehicle } from '@/types/vehicle'
import VehicleDetails from './VehicleDetails'
import VehicleFeatures from './VehicleFeatures'
import VehicleImage from './VehicleImage'
import VehiclePrice from './VehiclePrice'

interface VehicleCardProps {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <VehicleImage vehicle={vehicle} />

      {/* Mobile-optimized content */}
      <div className="p-3 sm:p-4">
        <VehicleDetails vehicle={vehicle} />
        <VehiclePrice vehicle={vehicle} />

        {/* Hide features on very small screens to save space */}
        <div className="hidden sm:block">
          <VehicleFeatures />
        </div>
      </div>
    </div>
  )
}
