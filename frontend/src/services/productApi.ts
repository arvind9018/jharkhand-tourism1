// src/services/productApi.ts
import { api } from './api';
import type { Product } from '../types/Product';

// Get all products (public)
export const getAllProducts = async (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get artisan's own products
export const getMyProducts = async (): Promise<{ success: boolean; data: Product[] }> => {
  const response = await api.get('/products/my/products');
  return response.data;
};

// Get single product
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
};

// Create product
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  const response = await api.post('/products', productData);
  return response.data.data;
};

// Update product
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data.data;
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// Update product stock
export const updateProductStock = async (id: string, quantity: number, inStock: boolean) => {
  const response = await api.patch(`/products/${id}/stock`, { quantity, inStock });
  return response.data;
};