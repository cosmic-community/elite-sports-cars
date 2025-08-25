import { getSalesTeam } from '@/lib/cosmic'
import type { SalesTeamMember } from '@/types'

export const metadata = {
  title: 'Sales Team | Elite Sports Cars',
  description: 'Meet our experienced sales team. Our specialists are here to help you find the perfect luxury sports car.',
}

function TeamMemberCard({ member }: { member: SalesTeamMember }) {
  const profileImage = member.metadata.profile_photo?.imgix_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format,compress'
  
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={profileImage}
          alt={member.metadata.full_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-card-foreground">
          {member.metadata.full_name}
        </h3>
        <p className="text-accent font-medium mb-3">
          {member.metadata.position}
        </p>
        
        {member.metadata.specialties && member.metadata.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2 text-card-foreground">Specialties:</h4>
            <div className="flex flex-wrap gap-2">
              {member.metadata.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {member.metadata.bio && (
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {member.metadata.bio}
          </p>
        )}
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href={`tel:${member.metadata.phone}`} className="hover:text-accent transition-colors">
              {member.metadata.phone}
            </a>
          </div>
          <div className="flex items-center text-muted-foreground">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href={`mailto:${member.metadata.email}`} className="hover:text-accent transition-colors">
              {member.metadata.email}
            </a>
          </div>
          {member.metadata.years_experience && (
            <div className="flex items-center text-muted-foreground">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span>{member.metadata.years_experience} years experience</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default async function TeamPage() {
  const teamMembers = await getSalesTeam()

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sales Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our experienced professionals who are passionate about luxury sports cars and dedicated to helping you find your perfect vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-16">
        <div className="container-custom">
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Team Information Coming Soon</h2>
              <p className="text-muted-foreground">
                Our sales team information will be available shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}