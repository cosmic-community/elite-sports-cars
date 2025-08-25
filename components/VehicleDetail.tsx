'use client'

import { useState } from 'react'
import type { SportsCar } from '@/types'

interface VehicleDetailProps {
  vehicle: SportsCar
}

export default function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!vehicle || !vehicle.metadata) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <p className="text-gray-400">The requested vehicle could not be loaded.</p>
        </div>
      </div>
    )
  }

  const { metadata } = vehicle
  const images = metadata.vehicle_images || []
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const salesRep = metadata.sales_rep
  const location = metadata.location

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-gold hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to Gallery
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {images.length > 0 && (
              <>
                <div className="relative">
                  <img
                    src={`${images[currentImageIndex]?.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={`${metadata.make} ${metadata.model} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
                
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ${
                          index === currentImageIndex ? 'ring-2 ring-gold' : ''
                        }`}
                      >
                        <img
                          src={`${image.imgix_url}?w=160&h=120&fit=crop&auto=format,compress`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {metadata.year} {metadata.make} {metadata.model}
              </h1>
              <p className="text-3xl text-gold font-bold">
                {formatPrice(metadata.price)}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 bg-gray-900 p-6 rounded-lg">
              <div>
                <span className="text-gray-400">Year:</span>
                <p className="font-semibold">{metadata.year}</p>
              </div>
              <div>
                <span className="text-gray-400">Condition:</span>
                <p className="font-semibold">{metadata.condition?.value}</p>
              </div>
              {metadata.mileage && (
                <div>
                  <span className="text-gray-400">Mileage:</span>
                  <p className="font-semibold">{metadata.mileage.toLocaleString()} miles</p>
                </div>
              )}
              {metadata.engine && (
                <div>
                  <span className="text-gray-400">Engine:</span>
                  <p className="font-semibold">{metadata.engine}</p>
                </div>
              )}
              {metadata.horsepower && (
                <div>
                  <span className="text-gray-400">Horsepower:</span>
                  <p className="font-semibold">{metadata.horsepower} HP</p>
                </div>
              )}
              {metadata.transmission && (
                <div>
                  <span className="text-gray-400">Transmission:</span>
                  <p className="font-semibold">{metadata.transmission.value}</p>
                </div>
              )}
              {metadata.exterior_color && (
                <div>
                  <span className="text-gray-400">Exterior:</span>
                  <p className="font-semibold">{metadata.exterior_color}</p>
                </div>
              )}
              {metadata.interior_color && (
                <div>
                  <span className="text-gray-400">Interior:</span>
                  <p className="font-semibold">{metadata.interior_color}</p>
                </div>
              )}
            </div>

            {/* Features */}
            {metadata.features && metadata.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {metadata.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gold">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {metadata.description && (
              <div>
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">{metadata.description}</p>
              </div>
            )}

            {/* Sales Representative */}
            {salesRep && salesRep.metadata && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Your Sales Representative</h3>
                <div className="flex items-center gap-4">
                  {salesRep.metadata.profile_photo && (
                    <img
                      src={`${salesRep.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                      alt={salesRep.metadata.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-bold">{salesRep.metadata.full_name}</h4>
                    <p className="text-gold">{salesRep.metadata.position}</p>
                    <p className="text-sm text-gray-400">{salesRep.metadata.phone}</p>
                    <p className="text-sm text-gray-400">{salesRep.metadata.email}</p>
                  </div>
                </div>
                {salesRep.metadata.specialties && salesRep.metadata.specialties.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400">Specialties:</p>
                    <p className="text-sm">{salesRep.metadata.specialties.join(', ')}</p>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            {location && location.metadata && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Vehicle Location</h3>
                <div>
                  <h4 className="font-bold">{location.metadata.location_name}</h4>
                  <p className="text-gray-300 whitespace-pre-line">{location.metadata.address}</p>
                  <p className="text-gold mt-2">{location.metadata.phone}</p>
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gold hover:bg-gold/80 text-black font-bold py-3 px-6 rounded-lg transition-colors flex-1">
                Schedule Test Drive
              </button>
              <button className="border border-gold text-gold hover:bg-gold hover:text-black font-bold py-3 px-6 rounded-lg transition-colors flex-1">
                Get Financing Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}