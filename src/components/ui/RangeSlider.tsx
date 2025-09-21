interface PriceRangeFilterProps {
  min: number
  max: number
  value: [number, number]
  onChange: (range: [number, number]) => void
  step?: number
}

export default function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
  step = 5000,
}: PriceRangeFilterProps) {
  const handleChange = (newValue: number, index: 0 | 1) => {
    const newRange: [number, number] = [...value]
    newRange[index] = newValue

    // Ensure min doesn't exceed max and vice versa
    if (index === 0 && newValue < value[1]) {
      onChange(newRange)
    } else if (index === 1 && newValue > value[0]) {
      onChange(newRange)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Dual Range Slider */}
        <div className="relative h-2 bg-gray-200 rounded-lg">
          {/* Active range track */}
          <div
            className="absolute h-2 bg-blue-600 rounded-lg"
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              width: `${((value[1] - value[0]) / (max - min)) * 100}%`,
            }}
          />

          {/* Min range slider */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={e => handleChange(Number(e.target.value), 0)}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 1 }}
          />

          {/* Max range slider */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={e => handleChange(Number(e.target.value), 1)}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>${value[0].toLocaleString()}</span>
        <span>${value[1].toLocaleString()}</span>
      </div>
    </div>
  )
}
