import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type TranslationLang = 'es' | 'en';

// ── Category ─────────────────────────────────────────────────

export interface NewsCategoryTranslation {
  name?: string;
}

export interface NewsCategoryAdmin {
  id: number;
  slug: string;
  translations: Record<TranslationLang, NewsCategoryTranslation>;
}

export interface NewsCategorySimple {
  id: number;
  slug: string;
  name: string;
}

export interface NewsCategoryCreate {
  slug: string;
  translations: Partial<Record<TranslationLang, NewsCategoryTranslation>>;
}

// ── Tag ──────────────────────────────────────────────────────

export interface NewsTagTranslation {
  name?: string;
}

export interface NewsTagAdmin {
  id: number;
  slug: string;
  translations: Record<TranslationLang, NewsTagTranslation>;
}

export interface NewsTagSimple {
  id: number;
  slug: string;
  name: string;
}

export interface NewsTagCreate {
  slug: string;
  translations: Partial<Record<TranslationLang, NewsTagTranslation>>;
}

// ── Check ────────────────────────────────────────────────────

export interface NewsCheckTranslation {
  label?: string;
}

export interface NewsCheckAdmin {
  id: number;
  sort_order: number;
  translations: Record<TranslationLang, NewsCheckTranslation>;
}

export interface NewsCheckCreate {
  sort_order: number;
  translations: Partial<Record<TranslationLang, NewsCheckTranslation>>;
}

// ── Post ─────────────────────────────────────────────────────

export interface NewsPostTranslation {
  title?: string;
  breadcrumb?: string;
  section1_title?: string;
  section1_paragraph?: string;
  section2_title?: string;
  section2_paragraph1?: string;
  section2_paragraph2?: string;
  section3_title?: string;
  section3_paragraph1?: string;
  section3_paragraph2?: string;
  section4_title?: string;
  section4_paragraph?: string;
  blockquote?: string;
  section5_title?: string;
  section5_paragraph?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface NewsPostAdmin {
  id: number;
  slug: string;
  author_name?: string;
  author_image_url?: string;
  cover_image_url?: string;
  category_id?: number;
  category?: NewsCategoryAdmin;
  checks: NewsCheckAdmin[];
  tags: NewsTagAdmin[];
  related_post_ids: number[];
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  translations: Record<TranslationLang, NewsPostTranslation>;
}

export interface NewsPostCreate {
  slug: string;
  author_name?: string;
  author_image_url?: string;
  cover_image_url?: string;
  category_id?: number;
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
  translations: Partial<Record<TranslationLang, NewsPostTranslation>>;
  checks: NewsCheckCreate[];
  tag_ids: number[];
  related_post_ids: number[];
}

export interface NewsPostNonTranslatableUpdate {
  slug?: string;
  author_name?: string;
  author_image_url?: string;
  cover_image_url?: string;
  category_id?: number;
  is_published?: boolean;
  is_featured?: boolean;
  published_at?: string;
  checks?: NewsCheckCreate[];
  tag_ids?: number[];
  related_post_ids?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {
  private readonly apiUrl = `${environment.apiUrl}/noticias`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAllNews(skip: number = 0, limit: number = 50): Observable<NewsPostAdmin[]> {
    return this.http.get<NewsPostAdmin[]>(`${this.apiUrl}/admin/all?skip=${skip}&limit=${limit}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching news: ' + error.message)))
      );
  }

  getNewsById(id: number): Observable<NewsPostAdmin> {
    return this.http.get<NewsPostAdmin>(`${this.apiUrl}/admin/${id}`)
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

  createNews(news: NewsPostCreate): Observable<NewsPostAdmin> {
    return this.http.post<NewsPostAdmin>(`${this.apiUrl}/admin`, news)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating news post: ' + error.message)))
      );
  }

  updateNews(id: number, news: NewsPostNonTranslatableUpdate): Observable<NewsPostAdmin> {
    return this.http.put<NewsPostAdmin>(`${this.apiUrl}/admin/${id}`, news)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating news post: ' + error.message)))
      );
  }

  updateTranslation(id: number, lang: TranslationLang, data: NewsPostTranslation): Observable<NewsPostAdmin> {
    return this.http.put<NewsPostAdmin>(`${this.apiUrl}/admin/${id}/translations/${lang}`, data)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating news translation: ' + error.message)))
      );
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting news post: ' + error.message)))
      );
  }

  getCategories(): Observable<NewsCategorySimple[]> {
    return this.http.get<NewsCategorySimple[]>(`${this.apiUrl}/categorias`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching categories: ' + error.message)))
      );
  }

  createCategory(category: NewsCategoryCreate): Observable<NewsCategoryAdmin> {
    return this.http.post<NewsCategoryAdmin>(`${this.apiUrl}/admin/categorias`, category)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating category: ' + error.message)))
      );
  }

  getTags(): Observable<NewsTagSimple[]> {
    return this.http.get<NewsTagSimple[]>(`${this.apiUrl}/tags`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching tags: ' + error.message)))
      );
  }

  createTag(tag: NewsTagCreate): Observable<NewsTagAdmin> {
    return this.http.post<NewsTagAdmin>(`${this.apiUrl}/admin/tags`, tag)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating tag: ' + error.message)))
      );
  }
}
