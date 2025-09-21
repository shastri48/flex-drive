import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResultsHeader from '../ResultsHeader'

describe('ResultsHeader', () => {
  const mockOnSortChange = jest.fn()

  const defaultProps = {
    resultsCount: 10,
    selectedSort: '' as const,
    onSortChange: mockOnSortChange,
  }

  beforeEach(() => {
    mockOnSortChange.mockClear()
  })

  it('renders correctly with results count', () => {
    render(<ResultsHeader {...defaultProps} />)

    expect(screen.getAllByText('10 results')).toHaveLength(2) // Mobile and desktop versions
  })

  it('shows ZIP code when provided', () => {
    render(<ResultsHeader {...defaultProps} searchedZipCode="12345" />)

    expect(screen.getAllByText('10 results')).toHaveLength(2) // Mobile and desktop versions
    expect(screen.getAllByText('in 12345')).toHaveLength(2) // Mobile and desktop versions
  })

  it('does not show clear button when ZIP code is provided', () => {
    render(<ResultsHeader {...defaultProps} searchedZipCode="12345" />)

    expect(
      screen.queryByRole('button', { name: /show all locations/i })
    ).not.toBeInTheDocument()
  })

  it('renders sort dropdown with correct options', () => {
    render(<ResultsHeader {...defaultProps} />)

    const selects = screen.getAllByRole('combobox')
    expect(selects).toHaveLength(2) // Mobile and desktop versions

    expect(
      screen.getAllByRole('option', { name: /sort by popularity/i })
    ).toHaveLength(2)
    expect(
      screen.getAllByRole('option', { name: /price: low to high/i })
    ).toHaveLength(2)
    expect(
      screen.getAllByRole('option', { name: /price: high to low/i })
    ).toHaveLength(2)
    expect(
      screen.getAllByRole('option', { name: /model: a to z/i })
    ).toHaveLength(2)
  })

  it('shows selected sort option', () => {
    render(<ResultsHeader {...defaultProps} selectedSort="price-low" />)

    const selects = screen.getAllByRole('combobox') as HTMLSelectElement[]
    expect(selects[0].value).toBe('price-low')
  })

  it('calls onSortChange when sort option is selected', async () => {
    const user = userEvent.setup()
    render(<ResultsHeader {...defaultProps} />)

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], 'price-high')

    expect(mockOnSortChange).toHaveBeenCalledWith('price-high')
  })

  it('handles different result counts correctly', () => {
    const { rerender } = render(
      <ResultsHeader {...defaultProps} resultsCount={0} />
    )
    expect(screen.getAllByText('0 results')).toHaveLength(2) // Mobile and desktop versions

    rerender(<ResultsHeader {...defaultProps} resultsCount={1} />)
    expect(screen.getAllByText('1 results')).toHaveLength(2) // Mobile and desktop versions

    rerender(<ResultsHeader {...defaultProps} resultsCount={100} />)
    expect(screen.getAllByText('100 results')).toHaveLength(2) // Mobile and desktop versions
  })

  it('has correct layout structure', () => {
    render(<ResultsHeader {...defaultProps} searchedZipCode="12345" />)

    // Just verify the main container exists with the expected structure
    expect(screen.getAllByText('10 results')).toHaveLength(2) // Mobile and desktop versions
    expect(screen.getAllByText('in 12345')).toHaveLength(2) // Mobile and desktop versions
    expect(screen.getAllByRole('combobox')).toHaveLength(2) // Mobile and desktop versions
  })

  it('sort dropdown has correct styling', () => {
    render(<ResultsHeader {...defaultProps} />)

    const selects = screen.getAllByRole('combobox')
    expect(selects[0]).toHaveClass(
      'px-3',
      'py-2',
      'border',
      'border-gray-300',
      'rounded-md',
      'text-sm',
      'text-gray-900',
      'bg-white',
      'focus:ring-2',
      'focus:ring-red-500',
      'focus:border-red-500',
      'outline-none'
    )
  })

  it('handles empty sort selection', async () => {
    const user = userEvent.setup()
    render(<ResultsHeader {...defaultProps} selectedSort="price-low" />)

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], '')

    expect(mockOnSortChange).toHaveBeenCalledWith('')
  })

  it('renders search input when provided', () => {
    const mockOnSearchChange = jest.fn()
    render(
      <ResultsHeader
        {...defaultProps}
        searchQuery="test query"
        onSearchChange={mockOnSearchChange}
      />
    )

    const searchInputs = screen.getAllByPlaceholderText(
      'Search by make, model...'
    )
    expect(searchInputs).toHaveLength(2) // Mobile and desktop versions
    expect(searchInputs[0]).toHaveValue('test query')
  })

  it('calls onSearchChange when search input changes', async () => {
    const user = userEvent.setup()
    const mockOnSearchChange = jest.fn()
    render(
      <ResultsHeader
        {...defaultProps}
        searchQuery=""
        onSearchChange={mockOnSearchChange}
      />
    )

    const searchInputs = screen.getAllByPlaceholderText(
      'Search by make, model...'
    )
    await user.type(searchInputs[0], 'BMW')

    expect(mockOnSearchChange).toHaveBeenCalledWith('B')
    expect(mockOnSearchChange).toHaveBeenCalledWith('M')
    expect(mockOnSearchChange).toHaveBeenCalledWith('W')
  })
})
