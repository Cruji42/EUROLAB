import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServiceCard, ServiceDetail } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly apiUrl = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceCard[]> {
    return this.http.get<ServiceCard[]>(this.apiUrl);
  }

  getServiceBySlug(slug: string): Observable<ServiceDetail> {
    return this.http.get<ServiceDetail>(`${this.apiUrl}/${slug}`);
  }
}
