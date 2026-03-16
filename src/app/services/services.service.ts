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

  getAdminServices(): Observable<ServiceDetail[]> {
    console.log('Fetching admin services from:', `${this.apiUrl}/admin/all`);
    return this.http.get<ServiceDetail[]>(`${this.apiUrl}/admin/all`);
  }

  getServiceBySlug(slug: string): Observable<ServiceDetail> {
    return this.http.get<ServiceDetail>(`${this.apiUrl}/${slug}`);
  }

  getServiceById(id: number): Observable<ServiceDetail> {
    return this.http.get<ServiceDetail>(`${this.apiUrl}/admin/${id}`);
  }

  createService(service: any): Observable<ServiceDetail> {
    return this.http.post<ServiceDetail>(`${this.apiUrl}/admin`, service);
  }

  updateService(id: number, service: any): Observable<ServiceDetail> {
    return this.http.put<ServiceDetail>(`${this.apiUrl}/admin/${id}`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }
}
