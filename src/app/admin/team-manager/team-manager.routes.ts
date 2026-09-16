import { Routes } from '@angular/router';
import { TeamListComponent } from './team-list.component';
import { TeamFormComponent } from './team-form.component';
import { AdminTeamService } from '../services/admin-team.service';

export const TEAM_MANAGER_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminTeamService],
    children: [
      { path: '', component: TeamListComponent },
      { path: 'nuevo', component: TeamFormComponent },
      { path: ':id', component: TeamFormComponent }
    ]
  }
];
