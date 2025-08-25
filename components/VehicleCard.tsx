import Link from 'next/link'
import type { SportsCar } from '@/types'

interface VehicleCardProps {
  car: SportsCar
}

export default function VehicleCard({ car }: VehicleCardProps) {
  const primaryImage = car.metadata.vehicle_images?.[0]
  const transmission = car.metadata.transmission?.value || 'N/A'
  const condition = car.metadata.condition?.value || 'N/A'

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
    <Link href={`/vehicles/${car.slug}`}>
      <div className="card hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        {/* Vehicle Image */}
        <div className="aspect-video overflow-hidden">
          {primaryImage ? (
            <img
              src={`${primaryImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={car.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
        </div>

        {/* Vehicle Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              {condition}
            </span>
            <span className="text-2xl font-bold text-accent">
              {formatPrice(car.metadata.price)}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
            {car.metadata.year} {car.metadata.make} {car.metadata.model}
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
            <div>
              <span className="font-medium">Engine:</span>
              <div className="truncate">{car.metadata.engine || 'N/A'}</div>
            </div>
            <div>
              <span className="font-medium">Transmission:</span>
              <div>{transmission}</div>
            </div>
            <div>
              <span className="font-medium">Mileage:</span>
              <div>{car.metadata.mileage ? `${car.metadata.mileage.toLocaleString()} mi` : 'N/A'}</div>
            </div>
            <div>
              <span className="font-medium">Power:</span>
              <div>{car.metadata.horsepower ? `${car.metadata.horsepower} HP` : 'N/A'}</div>
            </div>
          </div>

          {car.metadata.exterior_color && (
            <div className="text-sm">
              <span className="font-medium text-gray-400">Color: </span>
              <span className="text-foreground">{car.metadata.exterior_color}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}