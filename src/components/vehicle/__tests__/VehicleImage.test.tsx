import { Vehicle } from '@/types/vehicle'
import { render, screen } from '@testing-library/react'
import VehicleImage from '../VehicleImage'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    className,
    fill: _fill,
    sizes: _sizes,
    ...props
  }: {
    src: string
    alt: string
    className?: string
    fill?: boolean
    sizes?: string
    [key: string]: unknown
  }) {
    // Filter out Next.js specific props that don't belong on img element
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, quality, placeholder, blurDataURL, ...imgProps } = props

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} {...imgProps} />
  }
})

describe('VehicleImage', () => {
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
    render(<VehicleImage vehicle={mockVehicle} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/camry.jpg')
    expect(image).toHaveAttribute('alt', '2023 Toyota Camry')
  })

  it('shows "Recently added" badge', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    expect(screen.getByText('Recently added')).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const container = screen.getByRole('img').closest('div')
    expect(container).toHaveClass('relative', 'h-40', 'sm:h-48', 'bg-gray-100')
  })

  it('badge has correct styling', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const badge = screen.getByText('Recently added')
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-md',
      'text-xs',
      'font-medium',
      'bg-gray-100',
      'text-gray-800'
    )
  })

  it('badge is positioned correctly', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const badgeContainer = screen.getByText('Recently added').closest('div')
    expect(badgeContainer).toHaveClass(
      'absolute',
      'top-2',
      'left-2',
      'sm:top-3',
      'sm:left-3',
      'z-10'
    )
  })

  it('image has correct styling classes for Next.js Image', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const image = screen.getByRole('img')
    expect(image).toHaveClass('object-cover')
  })

  it('handles different vehicle makes and models', () => {
    const hondaVehicle = {
      ...mockVehicle,
      make: 'Honda',
      model: 'Civic',
      year: 2022,
    }
    render(<VehicleImage vehicle={hondaVehicle} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', '2022 Honda Civic')
  })

  it('renders with different image URLs', () => {
    const vehicleWithDifferentImage = {
      ...mockVehicle,
      image: 'https://example.com/different-car.jpg',
    }
    render(<VehicleImage vehicle={vehicleWithDifferentImage} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute(
      'src',
      'https://example.com/different-car.jpg'
    )
  })

  it('handles vehicles with special characters in make/model', () => {
    const specialVehicle = {
      ...mockVehicle,
      make: 'BMW',
      model: 'X5 M-Sport',
      year: 2024,
    }
    render(<VehicleImage vehicle={specialVehicle} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', '2024 BMW X5 M-Sport')
  })

  it('has proper Next.js Image attributes', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com/camry.jpg')
    expect(image).toHaveAttribute('alt', '2023 Toyota Camry')
  })

  it('renders within proper container structure', () => {
    render(<VehicleImage vehicle={mockVehicle} />)

    const container = screen.getByRole('img').closest('div')
    expect(container).toHaveClass('relative', 'h-40', 'sm:h-48', 'bg-gray-100')

    const badge = screen.getByText('Recently added')
    expect(badge).toBeInTheDocument()
  })
})
