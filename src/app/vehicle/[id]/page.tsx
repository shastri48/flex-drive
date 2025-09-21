'use client'

import { Header } from '@/components/layout'
import { Button } from '@/components/ui'
import { vehiclesData } from '@/data/vehicles'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

export default function VehicleDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const vehicleId = params.id as string
  const vehicle = vehiclesData.find(v => v.id === vehicleId)

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h1>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <Header />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 p-2"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm sm:text-base">Back</span>
          </Button>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {/* Vehicle Image */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-red-100 relative h-56 sm:h-64 md:h-80 lg:h-96">
            <Image
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Vehicle Details */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-red-100">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {vehicle.trim} • {vehicle.mileage.toLocaleString()} mi •{' '}
                {vehicle.color}
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-0">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-red-600">
                    ${vehicle.price.toLocaleString()}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">Total Price</div>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    ${Math.round(vehicle.price / 48)}/mo
                  </span>
                  <div className="text-sm text-gray-500">Monthly Payment</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-red-200">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Available Now
                </p>
                <p className="text-sm font-medium text-red-600">
                  Get it by Sep 22
                </p>
              </div>
            </div>

            {/* Vehicle Specifications */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Vehicle Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Make</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.make}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.model}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.year}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Trim</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.trim}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Color</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.color}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Mileage</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.mileage.toLocaleString()} mi
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">
                    {vehicle.zipCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Included Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    Insurance included
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    Maintenance covered
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    24/7 roadside assistance
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg
                    className="w-5 h-5 text-green-600 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    Flexible return policy
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Reserve Now
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Schedule Test Drive
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
