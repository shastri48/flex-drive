import { Vehicle } from '@/types/vehicle'

interface VehicleDetailsProps {
  vehicle: Vehicle
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <div className="mb-2 sm:mb-3">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
        {vehicle.year} • {vehicle.make} {vehicle.model}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">
        {vehicle.trim} • {vehicle.mileage.toLocaleString()} miles •{' '}
        {vehicle.color}
      </p>
    </div>
  )
}
