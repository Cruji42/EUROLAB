import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type TranslationLang = 'es' | 'en';

export interface ServiceTranslation {
  name?: string;
  breadcrumb?: string;
  body_p1?: string;
  body_p2?: string;
  sub_title?: string;
  sub_paragraph?: string;
  info_title?: string;
  info_paragraph?: string;
  desc_title?: string;
  desc_paragraph?: string;
  detail_title?: string;
  detail_paragraph?: string;
  card_hover_text?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface ServiceCheckTranslation {
  label?: string;
}

export interface ServiceFAQTranslation {
  question?: string;
  answer?: string;
}

export interface ServiceCheckAdmin {
  id: number;
  sort_order: number;
  translations: Record<TranslationLang, ServiceCheckTranslation>;
}

export interface ServiceFAQAdmin {
  id: number;
  sort_order: number;
  translations: Record<TranslationLang, ServiceFAQTranslation>;
}

export interface ServiceCheckCreate {
  sort_order: number;
  translations: Partial<Record<TranslationLang, ServiceCheckTranslation>>;
}

export interface ServiceFAQCreate {
  sort_order: number;
  translations: Partial<Record<TranslationLang, ServiceFAQTranslation>>;
}

export interface ServiceAdmin {
  id: number;
  slug: string;
  hero_image_url?: string;
  card_icon_url?: string;
  is_active: boolean;
  sort_order: number;
  translations: Record<TranslationLang, ServiceTranslation>;
  checks: ServiceCheckAdmin[];
  faqs: ServiceFAQAdmin[];
  created_at: string;
  updated_at: string;
}

export interface ServiceCreate {
  slug: string;
  hero_image_url?: string;
  card_icon_url?: string;
  is_active: boolean;
  sort_order: number;
  translations: Partial<Record<TranslationLang, ServiceTranslation>>;
  checks: ServiceCheckCreate[];
  faqs: ServiceFAQCreate[];
}

export interface ServiceNonTranslatableUpdate {
  slug?: string;
  hero_image_url?: string;
  card_icon_url?: string;
  is_active?: boolean;
  sort_order?: number;
  checks?: ServiceCheckCreate[];
  faqs?: ServiceFAQCreate[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  private readonly apiUrl = `${environment.apiUrl}/servicios`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceAdmin[]> {
    return this.http.get<ServiceAdmin[]>(`${this.apiUrl}/admin/all`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching services: ' + error.message)))
      );
  }

  getServiceById(id: number): Observable<ServiceAdmin> {
    return this.http.get<ServiceAdmin>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching service: ' + error.message)))
      );
  }

  uploadImage(file: File, folder = 'servicios'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http.post<{ url: string }>(`${this.uploadUrl}/image`, form)
      .pipe(map(r => r.url));
  }

  createService(service: ServiceCreate): Observable<ServiceAdmin> {
    return this.http.post<ServiceAdmin>(`${this.apiUrl}/admin`, service)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating service: ' + error.message)))
      );
  }

  updateService(id: number, service: ServiceNonTranslatableUpdate): Observable<ServiceAdmin> {
    return this.http.put<ServiceAdmin>(`${this.apiUrl}/admin/${id}`, service)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating service: ' + error.message)))
      );
  }

  updateTranslation(id: number, lang: TranslationLang, data: ServiceTranslation): Observable<ServiceAdmin> {
    return this.http.put<ServiceAdmin>(`${this.apiUrl}/admin/${id}/translations/${lang}`, data)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating service translation: ' + error.message)))
      );
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting service: ' + error.message)))
      );
  }
}
