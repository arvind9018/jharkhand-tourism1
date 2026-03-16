// components/HomeSearch.tsx (Simplified Enhanced)
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const POPULAR_SEARCHES = ["Netarhat", "Hundru Falls", "Waterfalls", "Homestays", "Tribal Art"]

export default function HomeSearch() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!query.trim()) return
    navigate(`/destinations?search=${encodeURIComponent(query)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  const handlePopularClick = (term: string) => {
    setQuery(term)
    navigate(`/destinations?search=${encodeURIComponent(term)}`)
  }

  return (
    <div className="mt-8 w-full max-w-2xl">
      {/* Main Search Bar */}
      <div className={`
        relative flex items-center bg-white rounded-2xl overflow-hidden 
        transition-all duration-300 
        ${isFocused ? 'shadow-2xl scale-105 ring-4 ring-accent/20' : 'shadow-xl'}
      `}>
        {/* Search Icon with Animation */}
        <div className={`
          pl-5 transition-transform duration-300 
          ${isFocused ? 'scale-110 text-accent' : 'text-gray-400'}
        `}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search waterfalls, hills, culture..."
          className="flex-1 bg-transparent px-4 py-5 text-gray-800 placeholder-gray-400 outline-none text-lg"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="mr-2 text-gray-400 hover:text-gray-600 transition p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-accent text-white px-8 py-5 hover:bg-opacity-90 transition-all duration-300 font-semibold text-lg hover:px-10"
        >
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-white/70">Popular:</span>
        {POPULAR_SEARCHES.map((term, index) => (
          <button
            key={index}
            onClick={() => handlePopularClick(term)}
            className="group relative px-4 py-2 overflow-hidden"
          >
            {/* Background Animation */}
            <span className="absolute inset-0 bg-white/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            
            {/* Text */}
            <span className="relative text-sm text-white/80 group-hover:text-white transition">
              {term}
            </span>
          </button>
        ))}
      </div>

      {/* Search Tips */}
      <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
        <span>💡</span>
        <span>Try: "waterfalls near Ranchi", "homestays in Netarhat", "tribal art"</span>
      </div>
    </div>
  )
}