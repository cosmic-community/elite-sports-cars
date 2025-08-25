import Link from 'next/link'
import type { SportsCar } from '@/types'
import VehicleCard from '@/components/VehicleCard'

interface FeaturedCarsProps {
  cars: SportsCar[]
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (!cars || cars.length === 0) {
    return (
      <section className="py-16 bg-card">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Featured Vehicles</h2>
            <p className="text-gray-400">No featured vehicles available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-card">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Handpicked selection of our most exceptional sports cars, each representing the pinnacle of automotive excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/vehicles" className="btn-primary">
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  )
}