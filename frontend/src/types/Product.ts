// src/types/Product.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  artisan: string;
  artisanName: string;
  village: string;
  district: string;
  price: number;
  discountPrice?: number;
  rating: {
    average: number;
    count: number;
  };
  images: string[];
  inStock: boolean;
  quantity: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}