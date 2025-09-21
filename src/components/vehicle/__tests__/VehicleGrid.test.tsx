import { Vehicle } from '@/types/vehicle'
import { render, screen } from '@testing-library/react'
import VehicleGrid from '../VehicleGrid'

// Mock the child components
jest.mock('../VehicleCard', () => {
  return function MockVehicleCard({ vehicle }: { vehicle: Vehicle }) {
    return (
      <div data-testid={`vehicle-card-${vehicle.id}`}>
        {vehicle.make} {vehicle.model}
      </div>
    )
  }
})

// Note: We'll let the actual Skeleton component render for this test

jest.mock('../EmptyState', () => {
  return function MockEmptyState() {
    return <div data-testid="empty-state">No vehicles found</div>
  }
})

describe('VehicleGrid', () => {
  const mockVehicles: Vehicle[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      trim: 'LE',
      color: 'blue',
      mileage: 15000,
      price: 25000,
      image: 'https://example.com/camry.jpg',
      zipCode: '12345',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      trim: 'EX',
      color: 'red',
      mileage: 20000,
      price: 22000,
      image: 'https://example.com/civic.jpg',
      zipCode: '12345',
    },
  ]

  it('renders loading skeleton when isLoading is true', () => {
    render(<VehicleGrid vehicles={[]} isLoading={true} />)

    // Check for skeleton structure (animate-pulse class indicates loading skeleton)
    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('renders empty state when no vehicles and not loading', () => {
    render(<VehicleGrid vehicles={[]} isLoading={false} />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No vehicles found')).toBeInTheDocument()
  })

  it('renders empty state when no vehicles and isLoading is undefined', () => {
    render(<VehicleGrid vehicles={[]} />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No vehicles found')).toBeInTheDocument()
  })

  it('renders vehicle cards when vehicles are provided', () => {
    render(<VehicleGrid vehicles={mockVehicles} isLoading={false} />)

    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-card-2')).toBeInTheDocument()
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
  })

  it('renders vehicle cards when vehicles are provided and isLoading is undefined', () => {
    render(<VehicleGrid vehicles={mockVehicles} />)

    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-card-2')).toBeInTheDocument()
  })

  it('has correct grid styling', () => {
    render(<VehicleGrid vehicles={mockVehicles} />)

    const gridContainer = screen.getByTestId('vehicle-card-1').parentElement
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'gap-6'
    )
  })

  it('renders correct number of vehicle cards', () => {
    const manyVehicles = [
      ...mockVehicles,
      {
        id: '3',
        make: 'BMW',
        model: 'X5',
        year: 2023,
        trim: 'xDrive40i',
        color: 'black',
        mileage: 5000,
        price: 60000,
        image: 'https://example.com/x5.jpg',
        zipCode: '12345',
      },
    ]

    render(<VehicleGrid vehicles={manyVehicles} />)

    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-card-2')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-card-3')).toBeInTheDocument()
  })

  it('passes correct vehicle data to VehicleCard components', () => {
    render(<VehicleGrid vehicles={mockVehicles} />)

    // Check that the vehicle data is passed correctly to the mocked components
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
  })

  it('prioritizes loading state over empty state', () => {
    render(<VehicleGrid vehicles={[]} isLoading={true} />)

    // Check for skeleton structure instead of testid
    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
  })

  it('prioritizes loading state over vehicle rendering', () => {
    render(<VehicleGrid vehicles={mockVehicles} isLoading={true} />)

    // Check for skeleton structure instead of testid
    const skeletonElements = document.querySelectorAll('.animate-pulse')
    expect(skeletonElements.length).toBeGreaterThan(0)
    expect(screen.queryByTestId('vehicle-card-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('vehicle-card-2')).not.toBeInTheDocument()
  })

  it('handles single vehicle correctly', () => {
    const singleVehicle = [mockVehicles[0]]
    render(<VehicleGrid vehicles={singleVehicle} />)

    expect(screen.getByTestId('vehicle-card-1')).toBeInTheDocument()
    expect(screen.queryByTestId('vehicle-card-2')).not.toBeInTheDocument()
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
  })
})
