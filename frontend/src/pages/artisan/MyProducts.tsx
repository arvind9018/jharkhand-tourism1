// src/pages/MyProducts.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts, createProduct, updateProduct, deleteProduct } from '../../services/productApi';
import ProductFormModal from '../../components/ProductFormModal';
import type { Product } from '../../types/Product';

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await getMyProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (data: any) => {
    await createProduct(data);
    await loadProducts();
  };

  const handleUpdateProduct = async (data: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct._id, data);
      await loadProducts();
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      await loadProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">My Products</h1>
            <p className="text-gray-600 mt-2">Manage your crafted products</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition flex items-center gap-2"
          >
            <span>+</span> Add New Product
          </button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-primary mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">Start adding your handmade products to showcase them to customers.</p>
            <button
              onClick={openCreateModal}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                    <span className="text-accent font-bold">₹{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{product.category} • {product.village}, {product.district}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  
                  {/* Stock Info */}
                  <div className="mt-3 flex items-center gap-4">
                    <span className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Stock: {product.quantity}
                    </span>
                    <span className="text-sm text-gray-500">
                      Orders: {product.rating?.count || 0}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product._id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        product={editingProduct}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-primary mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}