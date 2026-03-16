import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list.component';
import { UserFormComponent } from './user-form.component';
import { AdminUsersService } from '../services/admin-users.service';

export const USERS_MANAGER_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminUsersService],
    children: [
      { path: '', component: UsersListComponent },
      { path: 'nuevo', component: UserFormComponent },
      { path: ':id', component: UserFormComponent }
    ]
  }
];
