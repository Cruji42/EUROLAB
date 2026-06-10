import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BannerSlide } from '../models/slider.model';

@Injectable({ providedIn: 'root' })
export class SliderService {
  private readonly base = `${environment.apiUrl}/slider`;

  constructor(private http: HttpClient) {}

  getActiveSlides(): Observable<BannerSlide[]> {
    return this.http.get<BannerSlide[]>(`${this.base}/`);
  }
}
