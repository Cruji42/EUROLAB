import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface NewsCategoryCreate {
  name: string;
  slug: string;
}

export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image_url?: string;
  author_name?: string;
  author_image_url?: string;
  category_id?: number;
  category?: NewsCategory;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsPostCreate {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image_url?: string;
  author_name?: string;
  author_image_url?: string;
  category_id?: number;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
}

export interface NewsPostUpdate {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  cover_image_url?: string;
  author_name?: string;
  author_image_url?: string;
  category_id?: number;
  meta_title?: string;
  meta_description?: string;
  is_published?: boolean;
  is_featured?: boolean;
  published_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {
  private readonly apiUrl = `${environment.apiUrl}/noticias`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAllNews(skip: number = 0, limit: number = 50): Observable<NewsPost[]> {
    return this.http.get<NewsPost[]>(`${this.apiUrl}/admin/all?skip=${skip}&limit=${limit}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching news: ' + error.message)))
      );
  }

  getNewsBySlug(slug: string): Observable<NewsPost> {
    return this.http.get<NewsPost>(`${this.apiUrl}/${slug}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching news post: ' + error.message)))
      );
  }

  uploadImage(file: File, folder = 'noticias'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http.post<{ url: string }>(`${this.uploadUrl}/image`, form)
      .pipe(map(r => r.url));
  }

  createNews(news: NewsPostCreate): Observable<NewsPost> {
    return this.http.post<NewsPost>(`${this.apiUrl}/admin`, news)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating news post: ' + error.message)))
      );
  }

  updateNews(id: number, news: NewsPostUpdate): Observable<NewsPost> {
    return this.http.put<NewsPost>(`${this.apiUrl}/admin/${id}`, news)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating news post: ' + error.message)))
      );
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting news post: ' + error.message)))
      );
  }

  getCategories(): Observable<NewsCategory[]> {
    return this.http.get<NewsCategory[]>(`${this.apiUrl}/categorias`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching categories: ' + error.message)))
      );
  }

  createCategory(category: NewsCategoryCreate): Observable<NewsCategory> {
    return this.http.post<NewsCategory>(`${this.apiUrl}/admin/categorias`, category)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating category: ' + error.message)))
      );
  }
}
