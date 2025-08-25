'use client'

import { useState, useEffect } from 'react'
import type { SportsCar } from '@/types'
import VehicleCard from '@/components/VehicleCard'

interface VehicleGridProps {
  cars: SportsCar[]
}

export default function VehicleGrid({ cars }: VehicleGridProps) {
  const [filteredCars, setFilteredCars] = useState<SportsCar[]>(cars)
  const [currentFilter, setCurrentFilter] = useState<string>('all')

  useEffect(() => {
    setFilteredCars(cars)
  }, [cars])

  // Handle filtering by make
  const handleFilter = (make: string) => {
    setCurrentFilter(make)
    if (make === 'all') {
      setFilteredCars(cars)
    } else {
      setFilteredCars(cars.filter(car => car.metadata.make.toLowerCase() === make.toLowerCase()))
    }
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No vehicles found.</p>
      </div>
    )
  }

  // Get unique makes for filter buttons
  const uniqueMakes = Array.from(new Set(cars.map(car => car.metadata.make)))

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => handleFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === 'all' 
              ? 'bg-accent text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All ({cars.length})
        </button>
        {uniqueMakes.map((make) => {
          const count = cars.filter(car => car.metadata.make === make).length
          return (
            <button
              key={make}
              onClick={() => handleFilter(make)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentFilter.toLowerCase() === make.toLowerCase() 
                  ? 'bg-accent text-white' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {make} ({count})
            </button>
          )
        })}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <VehicleCard key={car.id} car={car} />
        ))}
      </div>

      {filteredCars.length === 0 && currentFilter !== 'all' && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No {currentFilter} vehicles found.</p>
        </div>
      )}
    </div>
  )
}