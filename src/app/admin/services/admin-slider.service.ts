import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BannerSlide, BannerSlidePayload } from '../../models/slider.model';

@Injectable({ providedIn: 'root' })
export class AdminSliderService {
  private readonly base = `${environment.apiUrl}/slider`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BannerSlide[]> {
    return this.http.get<BannerSlide[]>(`${this.base}/admin`);
  }

  create(data: BannerSlidePayload): Observable<BannerSlide> {
    return this.http.post<BannerSlide>(`${this.base}/admin`, data);
  }

  update(id: number, data: BannerSlidePayload): Observable<BannerSlide> {
    return this.http.put<BannerSlide>(`${this.base}/admin/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/${id}`);
  }
}
