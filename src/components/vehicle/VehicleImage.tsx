import { Vehicle } from '@/types/vehicle'
import Image from 'next/image'

interface VehicleImageProps {
  vehicle: Vehicle
}

export default function VehicleImage({ vehicle }: VehicleImageProps) {
  return (
    <div className="relative h-40 sm:h-48 bg-gray-100">
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          Recently added
        </span>
      </div>
      <Image
        src={vehicle.image}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => {
          // Next.js Image component handles errors differently
          // We'll use a fallback image in the src if needed
        }}
      />
    </div>
  )
}
