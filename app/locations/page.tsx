import { getDealershipLocations } from '@/lib/cosmic'
import type { DealershipLocation } from '@/types'

export const metadata = {
  title: 'Dealership Locations | Elite Sports Cars',
  description: 'Visit our luxury sports car dealership locations. Find directions, contact information, and hours of operation.',
}

function LocationCard({ location }: { location: DealershipLocation }) {
  const locationImage = location.metadata.location_photo?.imgix_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format,compress'
  
  // Format address for display
  const formattedAddress = location.metadata.address.split('\n')
  
  // Format hours for display
  const formattedHours = location.metadata.hours?.split('\n') || []

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={locationImage}
          alt={location.metadata.location_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-card-foreground">
          {location.metadata.location_name}
        </h3>
        
        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start text-muted-foreground mb-2">
            <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              {formattedAddress.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-muted-foreground">
            <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href={`tel:${location.metadata.phone}`} className="hover:text-accent transition-colors">
              {location.metadata.phone}
            </a>
          </div>
          {location.metadata.email && (
            <div className="flex items-center text-muted-foreground">
              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={`mailto:${location.metadata.email}`} className="hover:text-accent transition-colors">
                {location.metadata.email}
              </a>
            </div>
          )}
        </div>

        {/* Hours */}
        {formattedHours.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-card-foreground flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Hours
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {formattedHours.map((hour, index) => (
                <div key={index}>{hour}</div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {location.metadata.services && location.metadata.services.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-card-foreground flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {location.metadata.services.map((service, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function LocationsPage() {
  const locations = await getDealershipLocations()

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Locations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit our luxury dealership locations to experience our premium sports cars in person. Professional service and expert guidance await you.
            </p>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="py-16">
        <div className="container-custom">
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Location Information Coming Soon</h2>
              <p className="text-muted-foreground">
                Our dealership location details will be available shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}