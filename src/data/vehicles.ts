import { Vehicle } from '@/types/vehicle'

export const vehiclesData: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2023,
    color: 'White',
    mileage: 15000,
    price: 28500,
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&auto=format',
    zipCode: '10001',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    year: 2022,
    color: 'Black',
    mileage: 22000,
    price: 26800,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format',
    zipCode: '10001',
  },
  {
    id: '3',
    make: 'BMW',
    model: '3 Series',
    trim: '330i',
    year: 2023,
    color: 'Blue',
    mileage: 8000,
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&auto=format',
    zipCode: '10001',
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C300',
    year: 2022,
    color: 'Silver',
    mileage: 18000,
    price: 38500,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&auto=format',
    zipCode: '90210',
  },
  {
    id: '5',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    year: 2023,
    color: 'Red',
    mileage: 12000,
    price: 39800,
    image:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&auto=format',
    zipCode: '90210',
  },
  {
    id: '6',
    make: 'Toyota',
    model: 'RAV4',
    trim: 'XLE',
    year: 2022,
    color: 'Gray',
    mileage: 25000,
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&auto=format',
    zipCode: '90210',
  },
  {
    id: '7',
    make: 'Honda',
    model: 'CR-V',
    trim: 'EX',
    year: 2023,
    color: 'White',
    mileage: 10000,
    price: 34500,
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&auto=format',
    zipCode: '60601',
  },
  {
    id: '8',
    make: 'Ford',
    model: 'Mustang',
    trim: 'GT',
    year: 2022,
    color: 'Red',
    mileage: 15000,
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&auto=format',
    zipCode: '60601',
  },
  {
    id: '9',
    make: 'Chevrolet',
    model: 'Camaro',
    trim: 'SS',
    year: 2023,
    color: 'Yellow',
    mileage: 5000,
    price: 48000,
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&auto=format',
    zipCode: '60601',
  },
  {
    id: '10',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    year: 2023,
    color: 'Black',
    mileage: 8000,
    price: 52000,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&auto=format',
    zipCode: '94102',
  },
  {
    id: '11',
    make: 'BMW',
    model: 'X5',
    trim: 'xDrive40i',
    year: 2022,
    color: 'White',
    mileage: 20000,
    price: 58000,
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop&auto=format',
    zipCode: '94102',
  },
  {
    id: '12',
    make: 'Mercedes-Benz',
    model: 'GLE',
    trim: 'GLE350',
    year: 2023,
    color: 'Silver',
    mileage: 12000,
    price: 62000,
    image:
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop&auto=format',
    zipCode: '94102',
  },
  {
    id: '13',
    make: 'Lexus',
    model: 'RX',
    trim: 'RX350',
    year: 2022,
    color: 'Blue',
    mileage: 18000,
    price: 48500,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&auto=format',
    zipCode: '33101',
  },
  {
    id: '14',
    make: 'Acura',
    model: 'MDX',
    trim: 'Technology',
    year: 2023,
    color: 'Gray',
    mileage: 9000,
    price: 52500,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&auto=format',
    zipCode: '33101',
  },
  {
    id: '15',
    make: 'Infiniti',
    model: 'QX60',
    trim: 'Pure',
    year: 2022,
    color: 'Black',
    mileage: 16000,
    price: 46000,
    image:
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&auto=format',
    zipCode: '33101',
  },
]

// Helper function to get unique values for filters
export const getUniqueValues = (key: keyof Vehicle): string[] => {
  const values = vehiclesData.map(vehicle => String(vehicle[key]))
  return Array.from(new Set(values)).sort()
}

export const getUniqueMakes = (): string[] => getUniqueValues('make')
export const getUniqueColors = (): string[] => getUniqueValues('color')
export const getUniqueZipCodes = (): string[] => getUniqueValues('zipCode')
