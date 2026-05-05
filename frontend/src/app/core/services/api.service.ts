import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ApiResponse,
  User,
  Product,
  Cart,
  Order,
  SearchFilter,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Auth Endpoints
  register(data: any): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/auth/register`, data)
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  getProfile(): Observable<ApiResponse<User>> {
    return this.http
      .get<ApiResponse<User>>(`${this.apiUrl}/auth/profile`)
      .pipe(catchError(this.handleError));
  }

  updateProfile(data: any): Observable<ApiResponse<User>> {
    return this.http
      .put<ApiResponse<User>>(`${this.apiUrl}/auth/profile`, data)
      .pipe(catchError(this.handleError));
  }

  // Product Endpoints
  getProducts(filters?: SearchFilter): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();

    if (filters) {
      if (filters.query) params = params.set('search', filters.query);
      if (filters.category) params = params.set('category', filters.category);
      if (filters.minPrice) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());
    }

    return this.http
      .get<ApiResponse<Product[]>>(`${this.apiUrl}/products`, { params })
      .pipe(catchError(this.handleError));
  }

  getProductById(id: string): Observable<ApiResponse<Product>> {
    return this.http
      .get<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFeaturedProducts(): Observable<ApiResponse<Product[]>> {
    return this.http
      .get<ApiResponse<Product[]>>(`${this.apiUrl}/products/featured`)
      .pipe(catchError(this.handleError));
  }

  createProduct(data: any): Observable<ApiResponse<Product>> {
    return this.http
      .post<ApiResponse<Product>>(`${this.apiUrl}/products`, data)
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: string, data: any): Observable<ApiResponse<Product>> {
    return this.http
      .put<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Cart Endpoints
  getCart(): Observable<ApiResponse<Cart>> {
    return this.http
      .get<ApiResponse<Cart>>(`${this.apiUrl}/cart`)
      .pipe(catchError(this.handleError));
  }

  addToCart(productId: string, quantity: number): Observable<ApiResponse<Cart>> {
    return this.http
      .post<ApiResponse<Cart>>(`${this.apiUrl}/cart/add`, { productId, quantity })
      .pipe(catchError(this.handleError));
  }

  updateCartItem(productId: string, quantity: number): Observable<ApiResponse<Cart>> {
    return this.http
      .put<ApiResponse<Cart>>(`${this.apiUrl}/cart/${productId}`, { quantity })
      .pipe(catchError(this.handleError));
  }

  removeFromCart(productId: string): Observable<ApiResponse<Cart>> {
    return this.http
      .delete<ApiResponse<Cart>>(`${this.apiUrl}/cart/${productId}`)
      .pipe(catchError(this.handleError));
  }

  clearCart(): Observable<ApiResponse<Cart>> {
    return this.http
      .delete<ApiResponse<Cart>>(`${this.apiUrl}/cart`)
      .pipe(catchError(this.handleError));
  }

  // Order Endpoints
  createOrder(orderData: any): Observable<ApiResponse<Order>> {
    return this.http
      .post<ApiResponse<Order>>(`${this.apiUrl}/orders`, orderData)
      .pipe(catchError(this.handleError));
  }

  getOrder(id: string): Observable<ApiResponse<Order>> {
    return this.http
      .get<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}`)
      .pipe(catchError(this.handleError));
  }

  getOrders(status?: string): Observable<ApiResponse<Order[]>> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);

    return this.http
      .get<ApiResponse<Order[]>>(`${this.apiUrl}/orders`, { params })
      .pipe(catchError(this.handleError));
  }

  updateOrderStatus(id: string, status: string, trackingNumber?: string): Observable<ApiResponse<Order>> {
    return this.http
      .put<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}/status`, {
        status,
        trackingNumber,
      })
      .pipe(catchError(this.handleError));
  }

  cancelOrder(id: string, reason: string): Observable<ApiResponse<Order>> {
    return this.http
      .post<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}/cancel`, { reason })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error?.error?.message || 'An error occurred'));
  }
}
