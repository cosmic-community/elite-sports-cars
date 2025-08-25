'use client'

import { useState } from 'react'
import type { SportsCar } from '@/types'

interface VehicleFiltersProps {
  cars: SportsCar[]
}

export default function VehicleFilters({ cars }: VehicleFiltersProps) {
  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedCondition, setSelectedCondition] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('')

  // Get unique values for filter options
  const uniqueMakes = Array.from(new Set(cars.map(car => car.metadata.make))).sort()
  const uniqueConditions = Array.from(
    new Set(cars.map(car => car.metadata.condition?.value).filter(Boolean))
  ).sort()

  const handleReset = () => {
    setSelectedMake('')
    setSelectedCondition('')
    setPriceRange('')
  }

  return (
    <div className="card p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-lg font-semibold mr-4">Filter by:</h3>
        
        {/* Make Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Make</label>
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Makes</option>
            {uniqueMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Condition</label>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Conditions</option>
            {uniqueConditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Prices</option>
            <option value="0-250000">Under $250K</option>
            <option value="250000-500000">$250K - $500K</option>
            <option value="500000-1000000">$500K - $1M</option>
            <option value="1000000+">$1M+</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="btn-secondary text-sm px-4 py-2 mt-6"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}