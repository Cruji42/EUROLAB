import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersListComponent } from './users-list.component';
import { UserFormComponent } from './user-form.component';
import { UserDeleteModalComponent } from './user-delete-modal.component';
import { AdminUsersService } from '../services/admin-users.service';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'nuevo', component: UserFormComponent },
  { path: ':id', component: UserFormComponent }
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    UsersListComponent,
    UserFormComponent,
    UserDeleteModalComponent,
    RouterModule.forChild(routes)
  ],
  providers: [
    AdminUsersService
  ]
})
export class UsersManagerModule { }
