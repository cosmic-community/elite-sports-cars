import Hero from '@/components/Hero'
import FeaturedCars from '@/components/FeaturedCars'
import { getSportsCars, getFeaturedSportsCars } from '@/lib/cosmic'

export default async function HomePage() {
  // Fetch featured cars for the homepage
  const featuredCars = await getFeaturedSportsCars(3)
  const allCars = await getSportsCars()

  return (
    <div>
      <Hero totalCars={allCars.length} />
      <FeaturedCars cars={featuredCars} />
    </div>
  )
}