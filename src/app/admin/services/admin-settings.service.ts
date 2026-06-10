import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SiteSettings {
  id: number;
  youtube_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  private readonly apiUrl = `${environment.apiUrl}/configuracion`;

  constructor(private http: HttpClient) {}

  getYoutubeUrl(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(`${this.apiUrl}/youtube`);
  }

  updateYoutubeUrl(url: string): Observable<SiteSettings> {
    return this.http.patch<SiteSettings>(`${this.apiUrl}/youtube`, { youtube_url: url });
  }
}
