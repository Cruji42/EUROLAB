import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CertificationCard, CertificationDetail } from '../models/certification.model';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
  private readonly apiUrl = `${environment.apiUrl}/certificaciones`;

  constructor(private http: HttpClient) {}

  getCertifications(params?: {
    skip?: number;
    limit?: number;
    destacadas?: boolean;
  }): Observable<CertificationCard[]> {
    let httpParams = new HttpParams();
    if (params?.skip !== undefined) httpParams = httpParams.set('skip', params.skip);
    if (params?.limit !== undefined) httpParams = httpParams.set('limit', params.limit);
    if (params?.destacadas !== undefined) httpParams = httpParams.set('destacadas', params.destacadas);
    return this.http.get<CertificationCard[]>(this.apiUrl, { params: httpParams });
  }

  getCertificationBySlug(slug: string): Observable<CertificationDetail> {
    return this.http.get<CertificationDetail>(`${this.apiUrl}/${slug}`);
  }
}
