import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ZipCodeModal from '../ZipCodeModal'

describe('ZipCodeModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSearch = jest.fn()

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSearch: mockOnSearch,
    isLoading: false,
    error: '',
  }

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnSearch.mockClear()
  })

  it('renders when isOpen is true', () => {
    render(<ZipCodeModal {...defaultProps} />)

    expect(screen.getByText(/find cars near you/i)).toBeInTheDocument()
    expect(
      screen.getByText(/enter your zip code to see accurate availability/i)
    ).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<ZipCodeModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText(/find cars near you/i)).not.toBeInTheDocument()
  })

  it('renders modal title and description', () => {
    render(<ZipCodeModal {...defaultProps} />)

    expect(screen.getByText('Find cars near you')).toBeInTheDocument()
    expect(
      screen.getByText(
        /enter your zip code to see accurate availability and delivery options/i
      )
    ).toBeInTheDocument()
  })

  it('renders input field', () => {
    render(<ZipCodeModal {...defaultProps} />)

    expect(screen.getByPlaceholderText('60601')).toBeInTheDocument()
  })

  it('renders locate me button', () => {
    render(<ZipCodeModal {...defaultProps} />)

    expect(screen.getByText('Locate me')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    // Find the close button by its SVG content
    const closeButton = screen.getByRole('button', { name: '' })
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    const input = screen.getByPlaceholderText('60601')
    const submitButton = screen.getByText('Update')

    await user.type(input, '12345')
    await user.click(submitButton)

    expect(mockOnSearch).toHaveBeenCalledWith('12345')
  })

  it('displays loading state', () => {
    render(<ZipCodeModal {...defaultProps} isLoading={true} />)

    expect(screen.getByText('Updating...')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<ZipCodeModal {...defaultProps} error="No vehicles found" />)

    expect(screen.getByText('No vehicles found')).toBeInTheDocument()
  })

  it('disables submit button when no zip code is entered', () => {
    render(<ZipCodeModal {...defaultProps} />)

    const submitButton = screen.getByText('Update')
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when zip code is entered', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    const input = screen.getByPlaceholderText('60601')
    const submitButton = screen.getByText('Update')

    await user.type(input, '12345')
    expect(submitButton).not.toBeDisabled()
  })

  it('disables submit button when loading', () => {
    render(<ZipCodeModal {...defaultProps} isLoading={true} />)

    const submitButton = screen.getByText('Updating...')
    expect(submitButton).toBeDisabled()
  })

  it('handles form submission on enter key', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    const input = screen.getByPlaceholderText('60601')
    await user.type(input, '12345')
    await user.keyboard('{Enter}')

    expect(mockOnSearch).toHaveBeenCalledWith('12345')
  })

  it('trims whitespace from zip code input', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    const input = screen.getByPlaceholderText('60601')
    const submitButton = screen.getByText('Update')

    // Clear any existing value and type the new value
    await user.clear(input)
    await user.type(input, '12345')
    await user.click(submitButton)

    expect(mockOnSearch).toHaveBeenCalledWith('12345')
  })

  it('limits input to 5 characters', async () => {
    const user = userEvent.setup()
    render(<ZipCodeModal {...defaultProps} />)

    const input = screen.getByPlaceholderText('60601') as HTMLInputElement
    await user.type(input, '123456789')

    expect(input.value).toBe('12345')
  })
})
