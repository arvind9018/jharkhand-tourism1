// pages/Marketplace.tsx
import { useEffect, useState } from "react"
import { fetchProducts, fetchProductsByCategory, type Product } from "../services/api"
import { useCart } from "../context/CartContext" // Import cart hook

const categories = ["All", "Dokra", "Paitkar", "Bamboo"]

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState("All")
  const { addToCart } = useCart() // Use cart hook
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    loadProducts()
  }, [category])

  const loadProducts = async () => {
    setLoading(true)
    let data
    if (category === "All") {
      data = await fetchProducts()
    } else {
      data = await fetchProductsByCategory(category)
    }
    setProducts(data)
    setLoading(false)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    
    // Show feedback
    setAddedToCart(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen px-6 sm:px-10 py-10 flex justify-center">
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen px-6 sm:px-10 py-10">

      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Tribal Handicraft Marketplace
        </h1>
        <p className="mt-2 max-w-2xl">
          Discover authentic Dokra metal art, Paitkar paintings, and bamboo
          crafts directly from tribal artisans of Jharkhand.
        </p>
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg border"
        >
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:scale-105 transition group"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full rounded-t-xl object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-primary">{p.name}</h3>
              <p className="text-sm text-gray-600">
                By {p.artisan} ({p.village})
              </p>

              <div className="mt-2 text-sm">
                ⭐ {p.rating?.average || '4.8'} | Category: {p.category}
                {p.description && (
                  <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                )}
              </div>

              <div className="mt-3 flex justify-between items-center">
                <p className="font-semibold text-accent">
                  ₹{p.price}
                </p>
                <button 
                  onClick={() => handleAddToCart(p)}
                  className={`px-4 py-2 rounded-lg transition ${
                    addedToCart[p.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-accent text-white hover:bg-opacity-90'
                  }`}
                >
                  {addedToCart[p.id] ? '✓ Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No products found.
        </p>
      )}
    </div>
  )
}