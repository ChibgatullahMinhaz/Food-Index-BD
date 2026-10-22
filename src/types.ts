export type Role = 'customer' | 'admin';

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
  image?: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number; // Base price (usually for smallest weight option)
  salePrice?: number | null;
  imageUrls: string[];
  weightOptions: string[]; // e.g. ["250g", "500g", "1kg"] or ["500g", "1 Liter", "2 Liter"]
  stockQuantity: number;
  isFeatured: boolean;
  categoryId: string;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
  origin?: string;
  benefits?: string[];
}

export interface OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  productTitle: string;
  productImage?: string;
  quantity: number;
  selectedWeight: string; // e.g. "500g"
  pricePerUnit: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type DeliveryArea = 'inside_dhaka' | 'outside_dhaka';
export type PaymentMethod = 'COD' | 'BKASH' | 'NAGAD';

export interface Order {
  id: string;
  userId?: string | null;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryArea: DeliveryArea;
  totalAmount: number;
  shippingCost: number;
  paymentMethod: PaymentMethod;
  paymentTransactionId?: string;
  orderStatus: OrderStatus;
  items: OrderItem[];
  orderNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
  pricePerUnit: number; // Calculated price for this weight variant
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrdersCount: number;
  deliveredOrdersCount: number;
  lowStockProductsCount: number;
  totalProductsCount: number;
  categoryBreakdown: { categoryName: string; count: number }[];
  recentOrders: Order[];
}
