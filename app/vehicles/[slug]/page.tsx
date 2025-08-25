// app/vehicles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getSportsCarBySlug } from '@/lib/cosmic'
import VehicleDetail from '@/components/VehicleDetail'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function VehiclePage({ params }: PageProps) {
  // In Next.js 15+, params is a Promise and must be awaited
  const { slug } = await params
  
  if (!slug) {
    notFound()
  }

  const car = await getSportsCarBySlug(slug)

  if (!car) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <VehicleDetail vehicle={car} />
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const car = await getSportsCarBySlug(slug)

  if (!car) {
    return {
      title: 'Vehicle Not Found - Elite Sports Cars',
    }
  }

  return {
    title: `${car.metadata.year} ${car.metadata.make} ${car.metadata.model} - Elite Sports Cars`,
    description: car.metadata.description || `${car.metadata.year} ${car.metadata.make} ${car.metadata.model} available at Elite Sports Cars`,
  }
}