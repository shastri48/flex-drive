interface CheckboxFilterProps {
  options: { value: string; label: string }[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}

export default function CheckboxFilter({
  options,
  selectedValues,
  onChange,
}: CheckboxFilterProps) {
  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={() => handleToggle(option.value)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span className="ml-3 text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  )
}
