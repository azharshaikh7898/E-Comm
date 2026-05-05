import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../../shared/models';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCart();
  }

  loadCart(): void {
    this.apiService.getCart().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.cartSubject.next(response.data);
        }
      },
      error: err => console.error('Error loading cart:', err),
    });
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.apiService.addToCart(productId, quantity).pipe(
      tap((response: any) => {
        if (response.data) {
          this.cartSubject.next(response.data);
        }
      })
    );
  }

  removeFromCart(productId: string): Observable<any> {
    return this.apiService.removeFromCart(productId).pipe(
      tap((response: any) => {
        if (response.data) {
          this.cartSubject.next(response.data);
        }
      })
    );
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.apiService.updateCartItem(productId, quantity).pipe(
      tap((response: any) => {
        if (response.data) {
          this.cartSubject.next(response.data);
        }
      })
    );
  }

  clearCart(): Observable<any> {
    return this.apiService.clearCart().pipe(
      tap((response: any) => {
        if (response.data) {
          this.cartSubject.next(response.data);
        }
      })
    );
  }

  getCart(): Cart | null {
    return this.cartSubject.value;
  }

  getCartTotal(): number {
    return this.cartSubject.value?.totalPrice || 0;
  }

  getCartItemCount(): number {
    return this.cartSubject.value?.totalItems || 0;
  }
}
