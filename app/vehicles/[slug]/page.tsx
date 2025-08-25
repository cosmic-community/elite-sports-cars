// app/vehicles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getSportsCarBySlug } from '@/lib/cosmic'
import VehicleDetail from '@/components/VehicleDetail'
import type { Metadata } from 'next'

interface VehiclePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params
  const car = await getSportsCarBySlug(slug)

  if (!car) {
    return {
      title: 'Vehicle Not Found',
    }
  }

  return {
    title: `${car.metadata.year} ${car.metadata.make} ${car.metadata.model} | Elite Sports Car Gallery`,
    description: car.metadata.description || `${car.metadata.year} ${car.metadata.make} ${car.metadata.model} for sale`,
  }
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params
  const car = await getSportsCarBySlug(slug)

  if (!car) {
    notFound()
  }

  return <VehicleDetail car={car} />
}