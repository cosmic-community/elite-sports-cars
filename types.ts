// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Sports Car interface
export interface SportsCar extends CosmicObject {
  type: 'sports-cars';
  metadata: {
    make: string;
    model: string;
    year: number;
    price: number;
    mileage?: number;
    engine?: string;
    horsepower?: number;
    transmission?: {
      key: TransmissionType;
      value: string;
    };
    condition: {
      key: ConditionType;
      value: string;
    };
    exterior_color?: string;
    interior_color?: string;
    features?: string[];
    description?: string;
    vehicle_images?: {
      url: string;
      imgix_url: string;
    }[];
    available: boolean;
    location?: DealershipLocation;
    sales_rep?: SalesTeamMember;
  };
}

// Sales Team Member interface
export interface SalesTeamMember extends CosmicObject {
  type: 'sales-team';
  metadata: {
    full_name: string;
    position: string;
    phone: string;
    email: string;
    specialties?: string[];
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    years_experience?: number;
  };
}

// Dealership Location interface
export interface DealershipLocation extends CosmicObject {
  type: 'dealership-locations';
  metadata: {
    location_name: string;
    address: string;
    phone: string;
    email?: string;
    hours?: string;
    services?: string[];
    location_photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Type literals for select-dropdown values
export type TransmissionType = 'manual' | 'automatic' | 'semi-automatic';
export type ConditionType = 'new' | 'used' | 'certified-pre-owned';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isSportsCar(obj: CosmicObject): obj is SportsCar {
  return obj.type === 'sports-cars';
}

export function isSalesTeamMember(obj: CosmicObject): obj is SalesTeamMember {
  return obj.type === 'sales-team';
}

export function isDealershipLocation(obj: CosmicObject): obj is DealershipLocation {
  return obj.type === 'dealership-locations';
}

// Utility types for common patterns
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreateSportsCarData = Omit<SportsCar, 'id' | 'created_at' | 'modified_at'>;