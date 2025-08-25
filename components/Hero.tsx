import Link from 'next/link'

interface HeroProps {
  totalCars: number
}

export default function Hero({ totalCars }: HeroProps) {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background Image - Updated to Lamborghini */}
      <div className="absolute inset-0">
        <img
          src="https://imgix.cosmicjs.com/e27b3da0-81fa-11f0-b0ac-f12686cb9ade-photo-1544636331-e26879cd4d9b-1756157498897.jpg?w=1920&h=1080&fit=crop&auto=format,compress"
          alt="Lamborghini Huracán EVO"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative container-custom py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Elite Sports Car
            <span className="block text-accent">Collection</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Discover our exclusive selection of premium sports cars from the world's most prestigious manufacturers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/vehicles" className="btn-primary inline-flex items-center justify-center">
              View Our Collection
            </Link>
            <Link href="/team" className="btn-secondary inline-flex items-center justify-center">
              Meet Our Team
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{totalCars}</div>
              <div className="text-gray-300">Premium Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5+</div>
              <div className="text-gray-300">Luxury Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">8+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}