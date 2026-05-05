// Core Models
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  address?: Address;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subCategory?: string;
  sku: string;
  stock: number;
  images: Image[];
  ratings: Rating;
  reviews: Review[];
  tags: string[];
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Image {
  url: string;
  altText?: string;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Review {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: Date;
}

export interface CartItem {
  productId: string | Product;
  quantity: number;
  price: number;
  discountPrice?: number;
  addedAt: Date;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  couponCode?: string;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  pricing: Pricing;
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  method: 'credit_card' | 'debit_card' | 'paypal' | 'stripe';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: Date;
}

export interface Pricing {
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  pagination?: Pagination;
  errors?: any[];
}

export interface SearchFilter {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}
