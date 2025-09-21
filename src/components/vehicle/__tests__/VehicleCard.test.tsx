import { Vehicle } from '@/types/vehicle'
import { render, screen } from '@testing-library/react'
import VehicleCard from '../VehicleCard'

// Mock the child components
jest.mock('../VehicleImage', () => {
  return function MockVehicleImage({ vehicle }: { vehicle: Vehicle }) {
    return (
      <div data-testid="vehicle-image">
        {vehicle.make} {vehicle.model} Image
      </div>
    )
  }
})

jest.mock('../VehicleDetails', () => {
  return function MockVehicleDetails({ vehicle }: { vehicle: Vehicle }) {
    return (
      <div data-testid="vehicle-details">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </div>
    )
  }
})

jest.mock('../VehiclePrice', () => {
  return function MockVehiclePrice({ vehicle }: { vehicle: Vehicle }) {
    return (
      <div data-testid="vehicle-price">${vehicle.price.toLocaleString()}</div>
    )
  }
})

jest.mock('../VehicleFeatures', () => {
  return function MockVehicleFeatures() {
    return <div data-testid="vehicle-features">Features</div>
  }
})

describe('VehicleCard', () => {
  const mockVehicle: Vehicle = {
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
  }

  it('renders correctly with vehicle data', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    expect(screen.getByTestId('vehicle-image')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-details')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-price')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-features')).toBeInTheDocument()
  })

  it('passes correct vehicle data to child components', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    expect(screen.getByText('Toyota Camry Image')).toBeInTheDocument()
    expect(screen.getByText('2023 Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('$25,000')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
  })

  it('has correct card styling', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    const cardContainer = screen
      .getByTestId('vehicle-image')
      .closest('.bg-white')
    expect(cardContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'border',
      'border-gray-200',
      'overflow-hidden',
      'hover:shadow-lg',
      'transition-shadow',
      'duration-200'
    )
  })

  it('has correct content padding', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    const contentContainer = screen
      .getByTestId('vehicle-details')
      .closest('.p-3')
    expect(contentContainer).toHaveClass('p-3', 'sm:p-4')
  })

  it('hides features on small screens', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    const featuresContainer = screen
      .getByTestId('vehicle-features')
      .closest('.hidden')
    expect(featuresContainer).toHaveClass('hidden', 'sm:block')
  })

  it('renders with different vehicle data', () => {
    const differentVehicle: Vehicle = {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      trim: 'EX',
      color: 'red',
      mileage: 20000,
      price: 22000,
      image: 'https://example.com/civic.jpg',
      zipCode: '67890',
    }

    render(<VehicleCard vehicle={differentVehicle} />)

    expect(screen.getByText('Honda Civic Image')).toBeInTheDocument()
    expect(screen.getByText('2022 Honda Civic')).toBeInTheDocument()
    expect(screen.getByText('$22,000')).toBeInTheDocument()
  })

  it('maintains proper component structure', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    // Check that all components are rendered
    expect(screen.getByTestId('vehicle-image')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-details')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-price')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-features')).toBeInTheDocument()
  })

  it('handles hover effects correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />)

    const cardContainer = screen
      .getByTestId('vehicle-image')
      .closest('.bg-white')
    expect(cardContainer).toHaveClass(
      'hover:shadow-lg',
      'transition-shadow',
      'duration-200'
    )
  })

  it('renders with high-priced vehicle', () => {
    const expensiveVehicle: Vehicle = {
      ...mockVehicle,
      make: 'BMW',
      model: 'X5',
      price: 75000,
    }

    render(<VehicleCard vehicle={expensiveVehicle} />)

    expect(screen.getByText('BMW X5 Image')).toBeInTheDocument()
    expect(screen.getByText('$75,000')).toBeInTheDocument()
  })

  it('renders with low-mileage vehicle', () => {
    const lowMileageVehicle: Vehicle = {
      ...mockVehicle,
      mileage: 1000,
    }

    render(<VehicleCard vehicle={lowMileageVehicle} />)

    // The component should still render normally
    expect(screen.getByTestId('vehicle-image')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-details')).toBeInTheDocument()
    expect(screen.getByTestId('vehicle-price')).toBeInTheDocument()
  })
})
