// pages/Destinations.tsx
import { useEffect, useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import DestinationCard from "../components/DestinationCard"
import type { Destination } from "../types/Destination"
import { fetchDestinations, fetchCategories, fetchDistricts } from "../services/api"

interface FilterState {
  search: string
  category: string
  district: string
  sortBy: 'name' | 'rating' | 'popularity'
  priceRange?: string
}

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [districts, setDistricts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "All",
    district: searchParams.get("district") || "All Districts",
    sortBy: 'popularity'
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setLoading(true)
    try {
      const [dests, cats, dists] = await Promise.all([
        fetchDestinations(),
        fetchCategories(),
        fetchDistricts()
      ])
      
      // Debug: Log destinations to see IDs
      console.log('Loaded destinations:', dests.map(d => ({ id: d.id, name: d.name, type: typeof d.id })))
      
      setDestinations(dests)
      setCategories(['All', ...cats.filter(c => c !== 'All')])
      setDistricts(['All Districts', ...dists])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let result = [...destinations]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower) ||
        d.district.toLowerCase().includes(searchLower) ||
        d.category?.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category !== "All") {
      result = result.filter(d => 
        d.category?.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // District filter
    if (filters.district !== "All Districts") {
      result = result.filter(d => 
        d.district.toLowerCase() === filters.district.toLowerCase()
      )
    }

    // Sorting
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default: // popularity
        result.sort((a, b) => (b.visitors || 0) - (a.visitors || 0))
    }

    return result
  }, [destinations, filters])

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category !== 'All') params.set('category', filters.category)
    if (filters.district !== 'All Districts') params.set('district', filters.district)
    setSearchParams(params)
  }, [filters, setSearchParams])

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All",
      district: "All Districts",
      sortBy: 'popularity'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Discovering amazing places...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/50 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              🏞️ Explore Jharkhand's Hidden Gems
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Discover Tourist Destinations
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              From majestic waterfalls to ancient temples, wildlife sanctuaries to hill stations – 
              explore the best of Jharkhand's natural and cultural heritage.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-accent">{destinations.length}+</div>
                <div className="text-sm text-gray-300">Destinations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">{categories.length-1}</div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">{districts.length}</div>
                <div className="text-sm text-gray-300">Districts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">4.5</div>
                <div className="text-sm text-gray-300">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        
        {/* FILTER SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search destinations, attractions, or locations..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              {districts.map(dist => (
                <option key={dist}>{dist}</option>
              ))}
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg border ${
                  viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg border ${
                  viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                📋 List
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.search || filters.category !== 'All' || filters.district !== 'All Districts') && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">Active filters:</span>
              {filters.search && (
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                  Search: "{filters.search}"
                  <button onClick={() => handleFilterChange('search', '')} className="ml-1">✕</button>
                </span>
              )}
              {filters.category !== 'All' && (
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                  {filters.category}
                  <button onClick={() => handleFilterChange('category', 'All')} className="ml-1">✕</button>
                </span>
              )}
              {filters.district !== 'All Districts' && (
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1">
                  {filters.district}
                  <button onClick={() => handleFilterChange('district', 'All Districts')} className="ml-1">✕</button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-accent underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-accent">{filteredDestinations.length}</span> destinations found
          </p>
          <p className="text-sm text-gray-500">
            Page 1 of {Math.ceil(filteredDestinations.length / 9)}
          </p>
        </div>

        {/* DESTINATION GRID/LIST */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏞️</div>
            <h3 className="text-2xl font-bold text-primary mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={clearFilters}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDestinations.map(destination => (
              <DestinationListItem key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {filteredDestinations.length > 9 && (
          <div className="mt-12 flex justify-center gap-2">
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>
            <span className="w-10 h-10 flex items-center justify-center">...</span>
            <PaginationButton>8</PaginationButton>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function PaginationButton({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-10 h-10 rounded-lg border transition ${
        active 
          ? 'bg-accent text-white border-accent' 
          : 'hover:bg-accent hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

function DestinationListItem({ destination }: { destination: Destination }) {
  const ratingValue = destination.rating ?? 4.5
  
  return (
    <Link to={`/destinations/${destination.id}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4 flex gap-6">
        <img
          src={destination.image || (destination.images?.[0]) || 'https://via.placeholder.com/150'}
          alt={destination.name}
          className="w-32 h-32 rounded-lg object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image'
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-primary">{destination.name}</h3>
            <span className="text-accent font-semibold">⭐ {ratingValue.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{destination.district}</p>
          <p className="text-gray-700 line-clamp-2">{destination.description}</p>
          <div className="mt-3 flex gap-2">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs">
              {destination.category || 'Tourist Spot'}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
              📍 Nearby attractions
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}