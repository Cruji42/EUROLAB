import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Certification {
  id: number;
  slug: string;
  title: string;
  issuing_body: string;
  cert_type: string;
  excerpt?: string;
  description?: string;
  cover_image_url?: string;
  certificate_file_url?: string;
  is_active: boolean;
  is_featured: boolean;
  issued_at?: string;
  expires_at?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface CertificationCreate {
  slug: string;
  title: string;
  issuing_body: string;
  cert_type: string;
  excerpt?: string;
  description?: string;
  cover_image_url?: string;
  certificate_file_url?: string;
  is_active: boolean;
  is_featured: boolean;
  issued_at?: string;
  expires_at?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface CertificationUpdate extends Partial<CertificationCreate> {}

@Injectable({
  providedIn: 'root'
})
export class AdminCertificationsService {
  private readonly apiUrl = `${environment.apiUrl}/certificaciones`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAllCertifications(skip = 0, limit = 50): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.apiUrl}/admin/all?skip=${skip}&limit=${limit}`)
      .pipe(catchError(err => throwError(() => new Error('Error fetching certifications: ' + err.message))));
  }

  getCertificationBySlug(slug: string): Observable<Certification> {
    return this.http.get<Certification>(`${this.apiUrl}/${slug}`)
      .pipe(catchError(err => throwError(() => new Error('Error fetching certification: ' + err.message))));
  }

  createCertification(data: CertificationCreate): Observable<Certification> {
    return this.http.post<Certification>(`${this.apiUrl}/admin`, data)
      .pipe(catchError(err => throwError(() => new Error('Error creating certification: ' + err.message))));
  }

  updateCertification(id: number, data: CertificationUpdate): Observable<Certification> {
    return this.http.put<Certification>(`${this.apiUrl}/admin/${id}`, data)
      .pipe(catchError(err => throwError(() => new Error('Error updating certification: ' + err.message))));
  }

  deleteCertification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(catchError(err => throwError(() => new Error('Error deleting certification: ' + err.message))));
  }

  uploadImage(file: File, folder = 'certificaciones'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http.post<{ url: string }>(`${this.uploadUrl}/image`, form)
      .pipe(map(r => r.url));
  }

  uploadFile(file: File, folder = 'certificaciones-docs'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http.post<{ url: string }>(`${this.uploadUrl}/file`, form)
      .pipe(map(r => r.url));
  }
}
