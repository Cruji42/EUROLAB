import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  sub: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const user = this.parseJwt(token);
        // Check if token is expired
        if (user.exp * 1000 > Date.now()) {
          this.currentUserSubject.next(user);
        } else {
          // Token expired, remove it
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<UserProfile> {
    // Create URLSearchParams as expected by OAuth2PasswordRequestForm
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);
    
    console.log('Login request to:', `${this.apiUrl}/token`);
    console.log('With credentials:', credentials.username);
    
    // Use HttpClient with appropriate headers for form data
    return this.http.post<TokenResponse>(`${this.apiUrl}/token`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      tap(response => {
        console.log('Login successful, token received:', response.access_token.substring(0, 10) + '...');
        localStorage.setItem(this.tokenKey, response.access_token);
        const user = this.parseJwt(response.access_token);
        console.log('Parsed user from token:', user);
        this.currentUserSubject.next(user);
      }),
      map(() => this.currentUserSubject.value!),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed: ' + (error.error?.detail || 'Unknown error')));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isEditor(): boolean {
    return this.hasRole('editor') || this.isAdmin();
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  private parseJwt(token: string): UserProfile {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
