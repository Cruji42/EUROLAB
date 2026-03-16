import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AdminUser {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
}

export interface AdminUserCreate {
  email: string;
  password: string;
  full_name?: string;
}

export interface AdminUserUpdate {
  email?: string;
  password?: string;
  full_name?: string;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/admin/users`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching users: ' + error.message)))
      );
  }

  getUserById(id: number): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.apiUrl}/admin/users/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching user: ' + error.message)))
      );
  }

  createUser(user: AdminUserCreate): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating user: ' + error.message)))
      );
  }

  updateUser(id: number, user: AdminUserUpdate): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.apiUrl}/admin/users/${id}`, user)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating user: ' + error.message)))
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/users/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting user: ' + error.message)))
      );
  }

  toggleUserStatus(id: number, isActive: boolean): Observable<AdminUser> {
    return this.http.patch<AdminUser>(`${this.apiUrl}/admin/users/${id}/status`, { is_active: isActive })
      .pipe(
        catchError(error => throwError(() => new Error('Error updating user status: ' + error.message)))
      );
  }
}
