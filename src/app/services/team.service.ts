import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TeamMemberCard } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly apiUrl = `${environment.apiUrl}/equipo`;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<TeamMemberCard[]> {
    return this.http.get<TeamMemberCard[]>(this.apiUrl);
  }
}
