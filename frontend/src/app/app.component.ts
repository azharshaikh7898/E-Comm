import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-Commerce Store';
  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUser$ = this.authService.currentUser$;
  cartItemCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItemCount$ = this.cartService.cart$.pipe(
      map(cart => cart?.totalItems || 0)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
