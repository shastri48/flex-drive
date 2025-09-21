import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CurrentZipDisplay from '../CurrentZipDisplay'

describe('CurrentZipDisplay', () => {
  const mockOnChangeLocation = jest.fn()

  beforeEach(() => {
    mockOnChangeLocation.mockClear()
  })

  it('renders zip code correctly', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    expect(screen.getByText('12345')).toBeInTheDocument()
  })

  it('renders location icon', () => {
    render(
      <CurrentZipDisplay
        zipCode="90210"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    // Check for SVG icon
    const svg = screen.getByRole('button').querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('has correct button styling', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'space-x-2',
      'bg-white',
      'px-3',
      'py-2',
      'rounded-lg',
      'border',
      'hover:bg-gray-50',
      'hover:border-red-300',
      'transition-colors',
      'cursor-pointer'
    )
  })

  it('calls onChangeLocation when clicked', async () => {
    const user = userEvent.setup()

    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockOnChangeLocation).toHaveBeenCalledTimes(1)
  })

  it('displays different zip codes correctly', () => {
    const { rerender } = render(
      <CurrentZipDisplay
        zipCode="11111"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    expect(screen.getByText('11111')).toBeInTheDocument()

    rerender(
      <CurrentZipDisplay
        zipCode="99999"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    expect(screen.getByText('99999')).toBeInTheDocument()
    expect(screen.queryByText('11111')).not.toBeInTheDocument()
  })

  it('has accessible button with zip code as name', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const button = screen.getByRole('button', { name: '12345' })
    expect(button).toBeInTheDocument()
  })

  it('handles click events properly', async () => {
    const user = userEvent.setup()

    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    // Click the entire button multiple times
    const button = screen.getByRole('button', { name: '12345' })
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(mockOnChangeLocation).toHaveBeenCalledTimes(3)
  })

  it('has correct text styling', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const zipText = screen.getByText('12345')
    expect(zipText).toHaveClass('text-sm', 'font-medium', 'text-gray-900')
  })

  it('has correct icon styling', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const svg = screen.getByRole('button').querySelector('svg')
    expect(svg).toHaveClass('w-4', 'h-4', 'text-gray-600')
  })

  it('maintains button structure with icon and text', () => {
    render(
      <CurrentZipDisplay
        zipCode="12345"
        onChangeLocation={mockOnChangeLocation}
      />
    )

    const button = screen.getByRole('button')
    const svg = button.querySelector('svg')
    const span = button.querySelector('span')

    expect(svg).toBeInTheDocument()
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent('12345')
  })
})
