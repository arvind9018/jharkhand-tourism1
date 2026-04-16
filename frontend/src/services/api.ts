// services/api.ts
import axios from "axios"
import type { Destination } from "../types/Destination"

// Create axios instance with baseURL
export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ==================== TYPES ====================

export interface StatsData {
  destinations: number
  homestays: number
  artisans: number
  tourists: number
}

export interface Homestay {
  id: string | number
  name: string
  village: string
  district: string
  price: number
  capacity: number
  rating: number
  image: string
  images?: string[]
  amenities?: string[]
  description?: string
}

export interface Product {
  id: string | number
  name: string
  category: string
  artisan: string
  village: string
  price: number
  rating: number
  image: string
  description?: string
}

// ==================== MOCK DATA ====================

// Mock destinations
const mockDestinations: Destination[] = [
  {
    id: 1,
    name: "Netarhat",
    district: "Latehar",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Pine_trees_of_Netarhat_Hill_station.jpg",
    rating: 4.5,
    description: "Beautiful hill station in Jharkhand",
    category: "Hill",
    nearby: ["Upper Ghaghri Falls", "Sunset Point"]
  },
  {
    id: 2,
    name: "Hundru Falls",
    district: "Ranchi",
    image: "https://i.ytimg.com/vi/d9zJKKJRIdM/sddefault.jpg",
    rating: 4.3,
    description: "Magnificent waterfall near Ranchi",
    category: "Waterfall",
    nearby: ["Jonha Falls", "Ranchi Hill"]
  },
  {
    id: 3,
    name: "Dassam Falls",
    district: "Ranchi",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    rating: 4.4,
    description: "Scenic waterfall in Ranchi district",
    category: "Waterfall",
    nearby: ["Tata Steel Zoo", "Rock Garden"]
  },
  {
    id: 4,
    name: "Betla National Park",
    district: "Latehar",
    image: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2025/07/23111157/In-Which-State-is-Betla-National-Park-Located.png",
    rating: 4.6,
    description: "One of India's first tiger reserves",
    category: "Wildlife",
    nearby: ["Palamu Fort", "Koel River"]
  },
  {
    id: 5,
    name: "Parasnath Hill",
    district: "Giridih",
    image: "https://images.trvl-media.com/place/553248635974899511/f7a1deb6-aa4c-487e-981f-11577751826a.jpg",
    rating: 4.7,
    description: "Highest peak in Jharkhand, Jain pilgrimage site",
    category: "Pilgrimage",
    nearby: ["Usri Falls", "Jain Temples"]
  },
  {
    id: 6,
    name: "Tagore Hill",
    district: "Ranchi",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerkBJQZR1vfN9VeWcs8-GnOzpRUrj3tP2LU1uDC3CstasAZxZOnyTWuaAiQPvG0siUnFPb5eFbvZpO9fuE_C3s5rIA1vECkrR1JzZDUzwjM-7HvhFr8UWF6ntypFKmRG5iQFUqd=s1360-w1360-h1020-rw",
    rating: 4.2,
    description: "Scenic hill associated with Rabindranath Tagore",
    category: "Culture",
    nearby: ["Rock Garden", "Ranchi Lake"]
  }
]

// Mock homestays
const mockHomestays: Homestay[] = [
  {
    id: 1,
    name: "Santhal Tribal Homestay",
    village: "Netarhat Village",
    district: "Latehar",
    price: 1200,
    capacity: 4,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    amenities: ["WiFi", "Meals", "Parking"],
    description: "Experience authentic Santhal culture"
  },
  {
    id: 2,
    name: "Munda Eco Homestay",
    village: "Hundru Area",
    district: "Ranchi",
    price: 1500,
    capacity: 3,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    amenities: ["WiFi", "Breakfast", "Guide Service"],
    description: "Eco-friendly homestay near waterfall"
  },
  {
    id: 3,
    name: "Oraon Heritage Home",
    village: "Khunti",
    district: "Khunti",
    price: 1000,
    capacity: 2,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=400",
    amenities: ["Meals", "Parking"],
    description: "Traditional Oraon tribal experience"
  }
]

// Mock products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Dokra Tribal Horse",
    category: "Dokra",
    artisan: "Birsa Hansda",
    village: "Khunti",
    price: 2500,
    rating: 4.8,
    image: "https://prativash.com/cdn/shop/products/WhatsAppImage2023-04-05at3.50.48PM_1200x1200.jpg?v=1680692021",
    description: "Traditional Dokra metal craft"
  },
  {
    id: 2,
    name: "Paitkar Scroll Painting",
    category: "Paitkar",
    artisan: "Sita Devi",
    village: "Amadubi",
    price: 1800,
    rating: 4.6,
    image: "https://villagesquare.in/wp-content/uploads/2023/10/Lead-01-Paitkar-scroll-paintings-Photo-2.jpg",
    description: "Ancient scroll painting art"
  },
  {
    id: 3,
    name: "Bamboo Hand Basket",
    category: "Bamboo",
    artisan: "Ramesh Munda",
    village: "Simdega",
    price: 900,
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/51z2ALMkiSL.jpg",
    description: "Handcrafted bamboo basket"
  }
]




// Mock stats
const mockStats: StatsData = {
  destinations: 50,
  homestays: 128,
  artisans: 200,
  tourists: 12450
}

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK_DATA = true;

// ==================== STATS API ====================

/**
 * Fetch dashboard/stats data
 * @returns Promise<StatsData>
 */
export async function fetchStats(): Promise<StatsData> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    return mockStats
  }

  try {
    const response = await api.get('/stats')
    
    if (response.data?.data) {
      return response.data.data
    } else if (response.data) {
      return response.data
    }
    return mockStats
  } catch (error) {
    console.error('Error fetching stats:', error)
    return mockStats
  }
}

// ==================== DESTINATION APIs ====================

/**
 * Fetch all destinations
 * @returns Promise<Destination[]>
 */
export async function fetchDestinations(): Promise<Destination[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockDestinations
  }

  try {
    const response = await api.get('/destinations')
    
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    } else {
      console.warn('Unexpected API response format, using mock data')
      return mockDestinations
    }
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return mockDestinations
  }
}

/**
 * Fetch featured destinations (for homepage slider)
 * @returns Promise<Destination[]>
 */
export async function fetchFeaturedDestinations(): Promise<Destination[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockDestinations]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6)
  }

  try {
    const response = await api.get('/destinations/featured')
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return mockDestinations.slice(0, 6)
  } catch (error) {
    console.error('Error fetching featured destinations:', error)
    return mockDestinations.slice(0, 6)
  }
}

/**
 * Fetch single destination by ID
 * @param id - Destination ID
 * @returns Promise<Destination | null>
 */
export async function fetchDestinationById(id: string | number): Promise<Destination | null> {
  console.log('=== fetchDestinationById Debug ===')
  console.log('Looking for destination with ID:', id)
  console.log('ID type:', typeof id)
  
  // Convert to number if it's a string
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id
  
  console.log('Numeric ID:', numericId)
  
  // Get all destinations first
  const allDestinations = await fetchDestinations()
  console.log('All destinations:', allDestinations.map(d => ({ id: d.id, name: d.name })))
  
  // Find the destination by ID (convert both to numbers for comparison)
  const destination = allDestinations.find(d => Number(d.id) === Number(numericId))
  
  console.log('Found destination:', destination)
  
  if (destination) {
    return destination
  }
  
  console.log('Destination with ID', numericId, 'not found')
  return null
}

/**
 * Search destinations with filters
 * @param params - Search parameters
 * @returns Promise<Destination[]>
 */
export async function searchDestinations(params: {
  search?: string
  category?: string
  district?: string
}): Promise<Destination[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    let filtered = [...mockDestinations]
    
    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower) ||
        d.district.toLowerCase().includes(searchLower)
      )
    }
    
    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(d => 
        d.category?.toLowerCase() === params.category?.toLowerCase()
      )
    }
    
    if (params.district) {
      filtered = filtered.filter(d => 
        d.district.toLowerCase() === params.district?.toLowerCase()
      )
    }
    
    return filtered
  }

  try {
    const response = await api.get('/destinations', { params })
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return []
  } catch (error) {
    console.error('Error searching destinations:', error)
    return []
  }
}

/**
 * Get all categories
 * @returns Promise<string[]>
 */
export async function fetchCategories(): Promise<string[]> {
  if (USE_MOCK_DATA) {
    const categories = [...new Set(mockDestinations.map(d => d.category).filter(Boolean))]
    return ['All', ...categories] as string[]
  }

  try {
    const response = await api.get('/destinations/categories')
    
    if (response.data?.data) {
      return ['All', ...response.data.data]
    }
    return ['All']
  } catch (error) {
    console.error('Error fetching categories:', error)
    return ['All', 'Waterfall', 'Hill', 'Wildlife', 'Culture', 'Pilgrimage']
  }
}

/**
 * Get all districts
 * @returns Promise<string[]>
 */
export async function fetchDistricts(): Promise<string[]> {
  if (USE_MOCK_DATA) {
    return [...new Set(mockDestinations.map(d => d.district))]
  }

  try {
    const response = await api.get('/destinations/districts')
    
    if (response.data?.data) {
      return response.data.data
    }
    return []
  } catch (error) {
    console.error('Error fetching districts:', error)
    return []
  }
}

// ==================== HOMESTAY APIs ====================

/**
 * Fetch all homestays
 * @returns Promise<Homestay[]>
 */
export async function fetchHomestays(): Promise<Homestay[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 600))
    return mockHomestays
  }

  try {
    const response = await api.get('/homestays')
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return mockHomestays
  } catch (error) {
    console.error('Error fetching homestays:', error)
    return mockHomestays
  }
}

/**
 * Fetch homestay by ID
 * @param id - Homestay ID
 * @returns Promise<Homestay | null>
 */
export async function fetchHomestayById(id: string | number): Promise<Homestay | null> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const homestay = mockHomestays.find(h => h.id === Number(id))
    return homestay || null
  }

  try {
    const response = await api.get(`/homestays/${id}`)
    
    if (response.data?.data) {
      return response.data.data
    } else if (response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error(`Error fetching homestay ${id}:`, error)
    return null
  }
}

/**
 * Search homestays with filters
 * @param params - Search parameters
 * @returns Promise<Homestay[]>
 */
export async function searchHomestays(params: {
  district?: string
  maxPrice?: number
  guests?: number
}): Promise<Homestay[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return mockHomestays.filter(h => {
      let match = true
      if (params.district) {
        match = match && h.district.toLowerCase().includes(params.district.toLowerCase())
      }
      if (params.maxPrice) {
        match = match && h.price <= params.maxPrice
      }
      if (params.guests) {
        match = match && h.capacity >= params.guests
      }
      return match
    })
  }

  try {
    const response = await api.get('/homestays/search', { params })
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return []
  } catch (error) {
    console.error('Error searching homestays:', error)
    return mockHomestays
  }
}

// ==================== PRODUCT APIs ====================

/**
 * Fetch all products
 * @returns Promise<Product[]>
 */
export async function fetchProducts(): Promise<Product[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockProducts
  }

  try {
    const response = await api.get('/products')
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return mockProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    return mockProducts
  }
}

/**
 * Fetch products by category
 * @param category - Product category
 * @returns Promise<Product[]>
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300))
    if (category === 'All') return mockProducts
    return mockProducts.filter(p => p.category === category)
  }

  try {
    const response = await api.get(`/products/category/${category}`)
    
    if (response.data?.data) {
      return response.data.data
    } else if (Array.isArray(response.data)) {
      return response.data
    }
    return mockProducts
  } catch (error) {
    console.error(`Error fetching products by category ${category}:`, error)
    return mockProducts
  }
}

// ==================== HEALTH CHECK ====================

/**
 * Check API health
 * @returns Promise<object>
 */
// export async function checkApiHealth() {
//   try {
//     const response = await api.get('/health')
//     return response.data
//   } catch (error) {
//     console.error('API health check failed:', error)
//     return { 
//       status: 'unhealthy', 
//       database: 'disconnected',
//       usingMockData: USE_MOCK_DATA 
//     }
//   }
// }


export const checkApiHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'unhealthy', database: 'disconnected' };
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get mock data status
 * @returns boolean
 */
export function isUsingMockData(): boolean {
  return USE_MOCK_DATA
}

// Export mock data for testing
export const getMockDestinations = () => mockDestinations
export const getMockHomestays = () => mockHomestays
export const getMockProducts = () => mockProducts
export const getMockStats = () => mockStats


// frontend/src/services/api.js - Add these functions

// ==================== CART API ====================
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart/add', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put('/cart/update', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/remove/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart/clear');
  return response.data;
};

// ==================== ORDER API ====================
export const createOrder = async (shippingAddress) => {
  const response = await api.post('/orders', { shippingAddress });
  return response.data;
};

export const getUserOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getArtisanOrders = async () => {
  const response = await api.get('/orders/artisan');
  return response.data;
};

// ==================== PROPERTY API (Owner) ====================
export const getMyProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const createProperty = async (data) => {
  const response = await api.post('/properties', data);
  return response.data;
};

export const updateProperty = async (id, data) => {
  const response = await api.put(`/properties/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const getPropertyBookings = async () => {
  const response = await api.get('/properties/bookings');
  return response.data;
};

// ==================== TOUR API (Guide) ====================
export const getMyTours = async () => {
  const response = await api.get('/tours');
  return response.data;
};

export const createTour = async (data) => {
  const response = await api.post('/tours', data);
  return response.data;
};

export const updateTour = async (id, data) => {
  const response = await api.put(`/tours/${id}`, data);
  return response.data;
};

export const deleteTour = async (id) => {
  const response = await api.delete(`/tours/${id}`);
  return response.data;
};

export const getTourBookings = async () => {
  const response = await api.get('/tours/bookings');
  return response.data;
};

// ==================== SHOP API (Vendor) ====================
export const getMyShop = async () => {
  const response = await api.get('/shop');
  return response.data;
};

export const updateShop = async (data) => {
  const response = await api.put('/shop', data);
  return response.data;
};

export const getInventory = async () => {
  const response = await api.get('/shop/inventory');
  return response.data;
};

export const updateInventory = async (id, quantity, inStock) => {
  const response = await api.put(`/shop/inventory/${id}`, { quantity, inStock });
  return response.data;
};