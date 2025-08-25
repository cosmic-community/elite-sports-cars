import Link from 'next/link'
import type { SportsCar } from '@/types'

interface VehicleDetailProps {
  car: SportsCar
}

export default function VehicleDetail({ car }: VehicleDetailProps) {
  const images = car.metadata.vehicle_images || []
  const transmission = car.metadata.transmission?.value || 'N/A'
  const condition = car.metadata.condition?.value || 'N/A'
  const salesRep = car.metadata.sales_rep
  const location = car.metadata.location

  // Format price with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/vehicles" className="text-accent hover:underline">
          ← Back to Vehicles
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {images.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={`${images[0].imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.slice(1, 4).map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                        alt={`${car.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Images Available</span>
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                {condition}
              </span>
              {car.metadata.available && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {car.metadata.year} {car.metadata.make} {car.metadata.model}
            </h1>
            <p className="text-3xl font-bold text-accent">
              {formatPrice(car.metadata.price)}
            </p>
          </div>

          {/* Specifications */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-400">Make:</span>
                <div>{car.metadata.make}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Model:</span>
                <div>{car.metadata.model}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Year:</span>
                <div>{car.metadata.year}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Mileage:</span>
                <div>{car.metadata.mileage ? `${car.metadata.mileage.toLocaleString()} mi` : 'N/A'}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Engine:</span>
                <div>{car.metadata.engine || 'N/A'}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Horsepower:</span>
                <div>{car.metadata.horsepower ? `${car.metadata.horsepower} HP` : 'N/A'}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Transmission:</span>
                <div>{transmission}</div>
              </div>
              <div>
                <span className="font-medium text-gray-400">Condition:</span>
                <div>{condition}</div>
              </div>
              {car.metadata.exterior_color && (
                <div>
                  <span className="font-medium text-gray-400">Exterior Color:</span>
                  <div>{car.metadata.exterior_color}</div>
                </div>
              )}
              {car.metadata.interior_color && (
                <div>
                  <span className="font-medium text-gray-400">Interior Color:</span>
                  <div>{car.metadata.interior_color}</div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          {car.metadata.features && car.metadata.features.length > 0 && (
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {car.metadata.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {car.metadata.description && (
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-300">{car.metadata.description}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            
            {salesRep && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Sales Representative</h3>
                <div className="flex items-center gap-4">
                  {salesRep.metadata?.profile_photo && (
                    <img
                      src={`${salesRep.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={salesRep.metadata.full_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium">{salesRep.metadata?.full_name}</div>
                    <div className="text-sm text-gray-400">{salesRep.metadata?.position}</div>
                    <div className="text-sm text-gray-400">{salesRep.metadata?.phone}</div>
                    <div className="text-sm text-gray-400">{salesRep.metadata?.email}</div>
                  </div>
                </div>
              </div>
            )}

            {location && (
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <div>
                  <div className="font-medium">{location.metadata?.location_name}</div>
                  <div className="text-sm text-gray-400 whitespace-pre-line">
                    {location.metadata?.address}
                  </div>
                  <div className="text-sm text-gray-400">{location.metadata?.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}