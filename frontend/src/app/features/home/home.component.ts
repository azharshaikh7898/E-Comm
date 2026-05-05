import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.apiService.getFeaturedProducts().subscribe({
      next: (response: any) => {
        this.featuredProducts = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load featured products';
        this.loading = false;
      },
    });
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  shopNow(): void {
    this.router.navigate(['/products']);
  }
}
