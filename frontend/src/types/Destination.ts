// types/Destination.ts
export interface Destination {
  id: string | number
  name: string
  district: string
  image?: string
  images?: string[]
  description?: string
  category?: string
  rating?: number;
  nearby?: string[]
  location?: string
  coordinates?: {
    lat: number
    lng: number
  }
  bestTime?: string
  entryFee?: number
  facilities?: string[]
  openingHours?: string
  visitors?: number
  reviewCount?: number
}