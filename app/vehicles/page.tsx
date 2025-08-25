import { getSportsCars } from '@/lib/cosmic'
import VehicleGrid from '@/components/VehicleGrid'
import VehicleFilters from '@/components/VehicleFilters'

export default async function VehiclesPage() {
  const cars = await getSportsCars()

  if (!cars || cars.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Our Vehicle Collection</h1>
          <p className="text-gray-400">No vehicles available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Vehicle Collection</h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Explore our exclusive selection of premium sports cars from the world's most prestigious manufacturers.
        </p>
      </div>
      
      <VehicleFilters cars={cars} />
      <VehicleGrid cars={cars} />
    </div>
  )
}