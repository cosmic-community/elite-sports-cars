import { getSportsCars } from '@/lib/cosmic'
import VehicleGrid from '@/components/VehicleGrid'

export const metadata = {
  title: 'Our Vehicle Collection | Elite Sports Cars',
  description: 'Browse our exclusive collection of premium sports cars from Ferrari, Lamborghini, Porsche and other luxury manufacturers.',
}

export default async function VehiclesPage() {
  const cars = await getSportsCars()

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Vehicle Collection</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our exclusive selection of premium sports cars from the world's most prestigious manufacturers.
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="py-16">
        <div className="container-custom">
          <VehicleGrid cars={cars} />
        </div>
      </div>
    </div>
  )
}