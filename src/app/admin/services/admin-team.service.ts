import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type TranslationLang = 'es' | 'en';

export interface TeamMemberTranslation {
  role?: string;
}

export interface TeamMemberAdmin {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  translations: Record<TranslationLang, TeamMemberTranslation>;
}

export interface TeamMemberCreate {
  name: string;
  email?: string;
  phone?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  translations: Partial<Record<TranslationLang, TeamMemberTranslation>>;
}

export interface TeamMemberNonTranslatableUpdate {
  name?: string;
  email?: string;
  phone?: string;
  image_url?: string;
  sort_order?: number;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminTeamService {
  private readonly apiUrl = `${environment.apiUrl}/equipo`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getAllMembers(skip = 0, limit = 100): Observable<TeamMemberAdmin[]> {
    return this.http.get<TeamMemberAdmin[]>(`${this.apiUrl}/admin/all?skip=${skip}&limit=${limit}`)
      .pipe(catchError(err => throwError(() => new Error('Error fetching team members: ' + err.message))));
  }

  getMemberById(id: number): Observable<TeamMemberAdmin> {
    return this.http.get<TeamMemberAdmin>(`${this.apiUrl}/admin/${id}`)
      .pipe(catchError(err => throwError(() => new Error('Error fetching team member: ' + err.message))));
  }

  createMember(data: TeamMemberCreate): Observable<TeamMemberAdmin> {
    return this.http.post<TeamMemberAdmin>(`${this.apiUrl}/admin`, data)
      .pipe(catchError(err => throwError(() => new Error('Error creating team member: ' + err.message))));
  }

  updateMember(id: number, data: TeamMemberNonTranslatableUpdate): Observable<TeamMemberAdmin> {
    return this.http.put<TeamMemberAdmin>(`${this.apiUrl}/admin/${id}`, data)
      .pipe(catchError(err => throwError(() => new Error('Error updating team member: ' + err.message))));
  }

  updateTranslation(id: number, lang: TranslationLang, data: TeamMemberTranslation): Observable<TeamMemberAdmin> {
    return this.http.put<TeamMemberAdmin>(`${this.apiUrl}/admin/${id}/translations/${lang}`, data)
      .pipe(catchError(err => throwError(() => new Error('Error updating team member translation: ' + err.message))));
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(catchError(err => throwError(() => new Error('Error deleting team member: ' + err.message))));
  }

  uploadImage(file: File, folder = 'equipo'): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    return this.http.post<{ url: string }>(`${this.uploadUrl}/image`, form)
      .pipe(map(r => r.url));
  }
}
