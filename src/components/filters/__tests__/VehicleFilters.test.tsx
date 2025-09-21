import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleFilters from '../VehicleFilters'

describe('VehicleFilters', () => {
  const mockOnMakeChange = jest.fn()
  const mockOnColorChange = jest.fn()
  const mockOnSortChange = jest.fn()
  const mockOnYearChange = jest.fn()
  const mockOnPriceRangeChange = jest.fn()
  const mockOnBodyTypeChange = jest.fn()
  const mockOnClearFilters = jest.fn()

  const defaultProps = {
    makes: ['Toyota', 'Honda', 'BMW'],
    colors: ['red', 'blue', 'black'],
    selectedMake: 'all',
    selectedColor: 'all',
    selectedSort: '' as const,
    selectedYear: [],
    priceRange: [20000, 70000] as [number, number],
    selectedBodyTypes: [],
    onMakeChange: mockOnMakeChange,
    onColorChange: mockOnColorChange,
    onSortChange: mockOnSortChange,
    onYearChange: mockOnYearChange,
    onPriceRangeChange: mockOnPriceRangeChange,
    onBodyTypeChange: mockOnBodyTypeChange,
    onClearFilters: mockOnClearFilters,
    resultsCount: 10,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(<VehicleFilters {...defaultProps} />)

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Make')).toBeInTheDocument()
    expect(screen.getByText('Color')).toBeInTheDocument()
    expect(screen.getByText('Price range')).toBeInTheDocument()
    expect(screen.getByText('Body type')).toBeInTheDocument()
    expect(screen.getByText('Model year')).toBeInTheDocument()
  })

  it('does not show clear all button when no filters are active', () => {
    render(<VehicleFilters {...defaultProps} />)

    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  it('shows clear all button when filters are active', () => {
    render(
      <VehicleFilters
        {...defaultProps}
        selectedMake="Toyota"
        selectedColor="red"
      />
    )

    expect(screen.getByText('Clear all')).toBeInTheDocument()
  })

  it('calls onClearFilters when clear all button is clicked', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} selectedMake="Toyota" />)

    const clearButton = screen.getByText('Clear all')
    await user.click(clearButton)

    expect(mockOnClearFilters).toHaveBeenCalledTimes(1)
  })

  it('renders make options correctly', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Click on Make section to expand it
    const makeSection = screen.getByText('Make')
    await user.click(makeSection)

    expect(screen.getByText('All Makes')).toBeInTheDocument()
    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
    expect(screen.getByText('BMW')).toBeInTheDocument()
  })

  it('renders color options when color section is expanded', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Click on Color section to expand it
    const colorSection = screen.getByText('Color')
    await user.click(colorSection)

    expect(screen.getByText('All Colors')).toBeInTheDocument()
    expect(screen.getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Black')).toBeInTheDocument()
  })

  it('renders body type options when body type section is expanded', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Click on Body type section to expand it
    const bodyTypeSection = screen.getByText('Body type')
    await user.click(bodyTypeSection)

    expect(screen.getByText('SUV')).toBeInTheDocument()
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('Sports')).toBeInTheDocument()
  })

  it('renders model year options when model year section is expanded', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Click on Model year section to expand it
    const modelYearSection = screen.getByText('Model year')
    await user.click(modelYearSection)

    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('calls onMakeChange when make is selected', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Click on Make section to expand it first
    const makeSection = screen.getByText('Make')
    await user.click(makeSection)

    const toyotaOption = screen.getByLabelText('Toyota')
    await user.click(toyotaOption)

    expect(mockOnMakeChange).toHaveBeenCalledWith('Toyota')
  })

  it('handles year selection correctly', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Expand Model year section
    const modelYearSection = screen.getByText('Model year')
    await user.click(modelYearSection)

    const year2023Option = screen.getByLabelText('2023')
    await user.click(year2023Option)

    expect(mockOnYearChange).toHaveBeenCalledWith([2023])
  })

  it('handles body type selection correctly', async () => {
    const user = userEvent.setup()
    render(<VehicleFilters {...defaultProps} />)

    // Expand Body type section
    const bodyTypeSection = screen.getByText('Body type')
    await user.click(bodyTypeSection)

    const suvOption = screen.getByLabelText('SUV')
    await user.click(suvOption)

    expect(mockOnBodyTypeChange).toHaveBeenCalledWith(['SUV'])
  })

  it('shows active filters correctly', () => {
    render(
      <VehicleFilters
        {...defaultProps}
        selectedMake="Toyota"
        selectedColor="red"
        selectedSort="price-low"
        selectedYear={[2023]}
        selectedBodyTypes={['SUV']}
        priceRange={[25000, 60000]}
      />
    )

    expect(screen.getByText('Clear all')).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    render(<VehicleFilters {...defaultProps} />)

    const container = screen.getByText('Filters').closest('.bg-white')
    expect(container).toHaveClass(
      'bg-white',
      'rounded-lg',
      'border',
      'border-gray-200'
    )
  })
})
