import { CheckIcon } from '@/components/ui'

export default function VehicleFeatures() {
  const features = ['Insurance included', 'Maintenance covered']

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        {features.map(feature => (
          <span key={feature} className="flex items-center">
            <CheckIcon className="w-3 h-3 mr-1" />
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}
