import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ContactRecipient {
  id: number;
  email: string;
  name: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ContactRecipientCreate {
  email: string;
  name?: string;
}

export interface ContactRecipientUpdate {
  name?: string;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminRecipientsService {
  private readonly apiUrl = `${environment.apiUrl}/contacto/admin/destinatarios`;

  constructor(private http: HttpClient) {}

  getRecipients(): Observable<ContactRecipient[]> {
    return this.http.get<ContactRecipient[]>(this.apiUrl)
      .pipe(
        catchError(error => throwError(() => new Error('Error fetching recipients: ' + error.message)))
      );
  }

  // Sin catchError: el componente necesita el status (409 = correo duplicado)
  createRecipient(recipient: ContactRecipientCreate): Observable<ContactRecipient> {
    return this.http.post<ContactRecipient>(this.apiUrl, recipient);
  }

  updateRecipient(id: number, recipient: ContactRecipientUpdate): Observable<ContactRecipient> {
    return this.http.patch<ContactRecipient>(`${this.apiUrl}/${id}`, recipient)
      .pipe(
        catchError(error => throwError(() => new Error('Error updating recipient: ' + error.message)))
      );
  }

  deleteRecipient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => throwError(() => new Error('Error deleting recipient: ' + error.message)))
      );
  }
}
