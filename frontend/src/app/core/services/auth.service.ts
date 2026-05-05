import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthResponse } from '../../shared/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadUserFromStorage();
  }

  register(userData: any): Observable<AuthResponse> {
    return new Observable(observer => {
      this.apiService.register(userData).subscribe({
        next: (response: any) => {
          if (response.data) {
            this.setUser(response.data.user, response.data.token);
            observer.next(response);
          }
          observer.complete();
        },
        error: err => {
          observer.error(err);
        },
      });
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return new Observable(observer => {
      this.apiService.login(email, password).subscribe({
        next: (response: any) => {
          if (response.data) {
            this.setUser(response.data.user, response.data.token);
            observer.next(response);
          }
          observer.complete();
        },
        error: err => {
          observer.error(err);
        },
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setUser(user: User, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
        this.isLoggedInSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }
}
