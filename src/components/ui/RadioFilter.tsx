interface RadioFilterProps {
  name: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
}

export default function RadioFilter({
  name,
  options,
  selectedValue,
  onChange,
}: RadioFilterProps) {
  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={e => onChange(e.target.value)}
            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
          />
          <span className="ml-3 text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  )
}
