import { createBucketClient } from '@cosmicjs/sdk'
import type { SportsCar, SalesTeamMember, DealershipLocation } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all sports cars
export async function getSportsCars(): Promise<SportsCar[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sports-cars' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as SportsCar[]).sort((a, b) => b.metadata.year - a.metadata.year);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch sports cars');
  }
}

// Get single sports car by slug
export async function getSportsCarBySlug(slug: string): Promise<SportsCar | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'sports-cars', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const car = response.object as SportsCar;
    
    if (!car || !car.metadata) {
      return null;
    }
    
    return car;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch sports car');
  }
}

// Get all sales team members
export async function getSalesTeam(): Promise<SalesTeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sales-team' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SalesTeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch sales team');
  }
}

// Get all dealership locations
export async function getDealershipLocations(): Promise<DealershipLocation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'dealership-locations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as DealershipLocation[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dealership locations');
  }
}

// Get featured sports cars (available cars)
export async function getFeaturedSportsCars(limit = 3): Promise<SportsCar[]> {
  try {
    const allCars = await getSportsCars();
    return allCars
      .filter(car => car.metadata.available)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured sports cars:', error);
    return [];
  }
}