import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioFilter from '../RadioFilter'

describe('RadioFilter', () => {
  const mockOnChange = jest.fn()
  const options = [
    { value: 'all', label: 'All' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
  ]

  const defaultProps = {
    name: 'vehicleType',
    options,
    selectedValue: 'all',
    onChange: mockOnChange,
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders all radio options', () => {
    render(<RadioFilter {...defaultProps} />)

    expect(screen.getByLabelText('All')).toBeInTheDocument()
    expect(screen.getByLabelText('Sedan')).toBeInTheDocument()
    expect(screen.getByLabelText('SUV')).toBeInTheDocument()
    expect(screen.getByLabelText('Truck')).toBeInTheDocument()
  })

  it('shows selected option as checked', () => {
    render(<RadioFilter {...defaultProps} selectedValue="sedan" />)

    const sedanRadio = screen.getByLabelText('Sedan') as HTMLInputElement
    const allRadio = screen.getByLabelText('All') as HTMLInputElement

    expect(sedanRadio.checked).toBe(true)
    expect(allRadio.checked).toBe(false)
  })

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup()
    render(<RadioFilter {...defaultProps} />)

    await user.click(screen.getByLabelText('SUV'))

    expect(mockOnChange).toHaveBeenCalledWith('suv')
  })

  it('has correct radio button styling', () => {
    render(
      <RadioFilter
        name="test"
        options={options}
        selectedValue="all"
        onChange={mockOnChange}
      />
    )

    const radioInput = screen.getByLabelText('All')
    expect(radioInput).toHaveClass(
      'w-4',
      'h-4',
      'text-red-600',
      'border-gray-300',
      'focus:ring-red-500'
    )
  })

  it('renders with different selected values', () => {
    const { rerender } = render(
      <RadioFilter {...defaultProps} selectedValue="all" />
    )
    expect((screen.getByLabelText('All') as HTMLInputElement).checked).toBe(
      true
    )

    rerender(<RadioFilter {...defaultProps} selectedValue="truck" />)
    expect((screen.getByLabelText('Truck') as HTMLInputElement).checked).toBe(
      true
    )
    expect((screen.getByLabelText('All') as HTMLInputElement).checked).toBe(
      false
    )
  })

  it('handles empty options array', () => {
    render(<RadioFilter {...defaultProps} options={[]} />)

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('handles single option', () => {
    const singleOption = [{ value: 'only', label: 'Only Option' }]
    render(<RadioFilter {...defaultProps} options={singleOption} />)

    expect(screen.getByLabelText('Only Option')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(1)
  })

  it('uses correct name attribute for radio group', () => {
    render(<RadioFilter {...defaultProps} name="testGroup" />)

    const radios = screen.getAllByRole('radio') as HTMLInputElement[]
    radios.forEach(radio => {
      expect(radio.name).toBe('testGroup')
    })
  })

  it('generates unique radio button names for different instances', () => {
    render(
      <div>
        <RadioFilter {...defaultProps} name="group1" />
        <RadioFilter {...defaultProps} name="group2" />
      </div>
    )

    const radios = screen.getAllByRole('radio') as HTMLInputElement[]
    const group1Radios = radios.filter(radio => radio.name === 'group1')
    const group2Radios = radios.filter(radio => radio.name === 'group2')

    expect(group1Radios).toHaveLength(4)
    expect(group2Radios).toHaveLength(4)
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<RadioFilter {...defaultProps} />)

    const firstRadio = screen.getByLabelText('All')
    firstRadio.focus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByLabelText('Sedan')).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByLabelText('SUV')).toHaveFocus()
  })

  it('handles space key selection', async () => {
    const user = userEvent.setup()
    render(<RadioFilter {...defaultProps} />)

    const suvRadio = screen.getByLabelText('SUV')
    suvRadio.focus()

    await user.keyboard(' ')
    expect(mockOnChange).toHaveBeenCalledWith('suv')
  })

  it('handles options with special characters', () => {
    const specialOptions = [
      { value: 'luxury-sedan', label: 'Luxury Sedan' },
      { value: 'mid-size-suv', label: 'Mid-Size SUV' },
      { value: 'pickup-truck', label: 'Pick-up Truck' },
    ]

    render(<RadioFilter {...defaultProps} options={specialOptions} />)

    expect(screen.getByLabelText('Luxury Sedan')).toBeInTheDocument()
    expect(screen.getByLabelText('Mid-Size SUV')).toBeInTheDocument()
    expect(screen.getByLabelText('Pick-up Truck')).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    render(<RadioFilter {...defaultProps} />)

    const container = screen.getByLabelText('All').closest('div')
    expect(container).toHaveClass('space-y-3')
  })

  it('label text has correct styling', () => {
    render(<RadioFilter {...defaultProps} />)

    const labelText = screen.getByText('All')
    expect(labelText).toHaveClass('ml-3', 'text-sm', 'text-gray-700')
  })
})
