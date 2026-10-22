import { db } from "../lib/db";
import { Product } from "../types";

export class ProductService {
  static async getAllProducts(filters?: { categorySlug?: string; isFeatured?: boolean; search?: string }) {
    return db.getProducts(filters);
  }

  static async getProductById(id: string) {
    return db.getProductById(id);
  }

  static async getProductBySlug(slug: string) {
    return db.getProductBySlug(slug);
  }

  static async createProduct(productData: {
    title: string;
    slug?: string;
    description?: string;
    price: number;
    salePrice?: number | null;
    weightOptions: string[];
    stockQuantity: number;
    categoryId: string;
    imageUrls: string[];
    isFeatured?: boolean;
    origin?: string;
    benefits?: string[];
  }) {
    return db.createProduct({
      title: productData.title,
      slug: productData.slug || '',
      description: productData.description || '',
      price: Number(productData.price),
      salePrice: productData.salePrice ? Number(productData.salePrice) : null,
      weightOptions: productData.weightOptions || ["500g", "1kg"],
      stockQuantity: Number(productData.stockQuantity || 0),
      categoryId: productData.categoryId,
      imageUrls: productData.imageUrls && productData.imageUrls.length > 0
        ? productData.imageUrls
        : ["https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80"],
      isFeatured: !!productData.isFeatured,
      origin: productData.origin || "Bangladesh",
      benefits: productData.benefits || []
    });
  }

  static async updateProduct(id: string, updates: Partial<Product>) {
    return db.updateProduct(id, updates);
  }

  static async deleteProduct(id: string) {
    return db.deleteProduct(id);
  }
}
