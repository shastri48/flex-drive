interface CurrentZipDisplayProps {
  zipCode: string
  onChangeLocation: () => void
}

export default function CurrentZipDisplay({
  zipCode,
  onChangeLocation,
}: CurrentZipDisplayProps) {
  return (
    <button
      onClick={onChangeLocation}
      className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border hover:bg-gray-50 hover:border-red-300 transition-colors cursor-pointer"
    >
      {/* Location Icon */}
      <svg
        className="w-4 h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      {/* ZIP Code */}
      <span className="text-sm font-medium text-gray-900">{zipCode}</span>
    </button>
  )
}
