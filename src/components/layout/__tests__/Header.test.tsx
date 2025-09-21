import { ZipCodeProvider } from '@/contexts/ZipCodeContext'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock the CurrentZipDisplay component directly
jest.mock('../../../components/search/CurrentZipDisplay', () => {
  return function MockCurrentZipDisplay({
    zipCode,
    onChangeLocation,
  }: {
    zipCode: string
    onChangeLocation: () => void
  }) {
    // Only render if zipCode is provided and not empty
    if (!zipCode) return null

    return (
      <div data-testid="current-zip-display">
        <span>{zipCode}</span>
        <button onClick={onChangeLocation}>Change location</button>
      </div>
    )
  }
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ZipCodeProvider>{component}</ZipCodeProvider>)
}

describe('Header', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
  })

  it('renders correctly with logo', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    expect(screen.getByText('FlexDrive')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
  })

  it('renders navigation links', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    expect(
      screen.getByRole('button', { name: /how it works/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('has correct header structure', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('bg-white', 'border-b', 'border-gray-200')
  })

  it('logo has correct styling with red theme', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    const logoContainer = screen.getByText('F').closest('div')
    expect(logoContainer).toHaveClass(
      'w-8',
      'h-8',
      'bg-red-600',
      'rounded-full'
    )
  })

  it('navigation buttons have correct styling', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    const howItWorksBtn = screen.getByRole('button', { name: /how it works/i })
    const loginBtn = screen.getByRole('button', { name: /log in/i })

    expect(howItWorksBtn).toHaveClass(
      'text-gray-600',
      'hover:text-gray-900',
      'text-sm',
      'font-medium'
    )
    expect(loginBtn).toHaveClass(
      'text-gray-600',
      'hover:text-gray-900',
      'text-sm',
      'font-medium'
    )
  })

  it('does not render zip code display when no zip code is saved', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    expect(screen.queryByTestId('current-zip-display')).not.toBeInTheDocument()
  })

  it('renders zip code display when zip code is saved in localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('12345')

    renderWithProvider(<Header />)

    // Wait for the component to initialize
    await screen.findAllByTestId('current-zip-display')

    expect(screen.getAllByTestId('current-zip-display')).toHaveLength(2) // Mobile and desktop versions
    expect(screen.getAllByText('12345')).toHaveLength(2) // Mobile and desktop versions
  })

  it('renders responsive layout classes', async () => {
    localStorageMock.getItem.mockReturnValue(null)

    renderWithProvider(<Header />)

    const container = screen.getByText('FlexDrive').closest('.max-w-7xl')
    expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('loads zip code from localStorage on mount', async () => {
    localStorageMock.getItem.mockReturnValue('90210')

    renderWithProvider(<Header />)

    expect(localStorageMock.getItem).toHaveBeenCalledWith('flexdrive-zipcode')

    // Wait for the component to initialize and render the zip code
    await screen.findAllByTestId('current-zip-display')
    expect(screen.getAllByText('90210')).toHaveLength(2) // Mobile and desktop versions
  })

  it('handles empty localStorage gracefully', async () => {
    localStorageMock.getItem.mockReturnValue('')

    renderWithProvider(<Header />)

    expect(screen.queryByTestId('current-zip-display')).not.toBeInTheDocument()
  })
})
