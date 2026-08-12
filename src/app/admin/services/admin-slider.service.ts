import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type TranslationLang = 'es' | 'en';

export interface BannerSlideTranslation {
  subtitle: string;
  title: string;
  description: string;
  btn_primary_text: string;
  btn_secondary_text: string;
}

export interface BannerSlideAdmin {
  id: number;
  sort_order: number;
  is_active: boolean;
  image_url: string;
  btn_primary_link: string;
  btn_secondary_link: string;
  translations: Record<TranslationLang, BannerSlideTranslation>;
}

export interface BannerSlideCreate {
  sort_order: number;
  is_active: boolean;
  image_url: string;
  btn_primary_link: string;
  btn_secondary_link?: string;
  translations: Partial<Record<TranslationLang, BannerSlideTranslation>>;
}

export interface BannerSlideNonTranslatableUpdate {
  sort_order?: number;
  is_active?: boolean;
  image_url?: string;
  btn_primary_link?: string;
  btn_secondary_link?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminSliderService {
  private readonly base = `${environment.apiUrl}/slider`;
  private readonly uploadBase = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BannerSlideAdmin[]> {
    return this.http.get<BannerSlideAdmin[]>(`${this.base}/admin`);
  }

  getById(id: number): Observable<BannerSlideAdmin> {
    return this.http.get<BannerSlideAdmin>(`${this.base}/admin/${id}`);
  }

  create(data: BannerSlideCreate): Observable<BannerSlideAdmin> {
    return this.http.post<BannerSlideAdmin>(`${this.base}/admin`, data);
  }

  update(id: number, data: BannerSlideNonTranslatableUpdate): Observable<BannerSlideAdmin> {
    return this.http.put<BannerSlideAdmin>(`${this.base}/admin/${id}`, data);
  }

  updateTranslation(id: number, lang: TranslationLang, data: BannerSlideTranslation): Observable<BannerSlideAdmin> {
    return this.http.put<BannerSlideAdmin>(`${this.base}/admin/${id}/translations/${lang}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/${id}`);
  }

  uploadImage(file: File, folder = 'slider'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http
      .post<{ url: string }>(`${this.uploadBase}/image`, form)
      .pipe(map(r => r.url));
  }
}
