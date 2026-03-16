import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ServiceCard, ServiceDetail } from '../../models/service.model';

export interface ServiceCreate {
  slug: string;
  name: string;
  breadcrumb?: string;
  hero_image_url?: string;
  body_p1: string;
  body_p2: string;
  sub_title?: string;
  sub_paragraph?: string;
  info_title?: string;
  info_paragraph?: string;
  desc_title?: string;
  desc_paragraph?: string;
  detail_title?: string;
  detail_paragraph?: string;
  card_hover_text?: string;
  card_icon_url?: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  sort_order: number;
  checks: ServiceCheckCreate[];
  faqs: ServiceFAQCreate[];
}

export interface ServiceUpdate {
  slug?: string;
  name?: string;
  breadcrumb?: string;
  hero_image_url?: string;
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
  card_icon_url?: string;
  meta_title?: string;
  meta_description?: string;
  is_active?: boolean;
  sort_order?: number;
  checks?: ServiceCheckCreate[];
  faqs?: ServiceFAQCreate[];
}

export interface ServiceCheckCreate {
  label: string;
  sort_order: number;
}

export interface ServiceFAQCreate {
  question: string;
  answer: string;
  sort_order: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  private readonly apiUrl = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<ServiceDetail[]> {
    return this.http.get<ServiceDetail[]>(`${this.apiUrl}/admin/all`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching services: ' + error.message)))
      );
  }

  getServiceById(id: number): Observable<ServiceDetail> {
    return this.http.get<ServiceDetail>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching service: ' + error.message)))
      );
  }

  createService(service: ServiceCreate): Observable<ServiceDetail> {
    return this.http.post<ServiceDetail>(`${this.apiUrl}/admin`, service)
      .pipe(
        catchError(error => throwError(() => new Error('Error creating service: ' + error.message)))
      );
  }

  updateService(id: number, service: ServiceUpdate): Observable<ServiceDetail> {
    return this.http.put<ServiceDetail>(`${this.apiUrl}/admin/${id}`, service)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating service: ' + error.message)))
      );
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting service: ' + error.message)))
      );
  }
}
