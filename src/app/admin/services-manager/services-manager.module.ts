import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesListComponent } from './services-list.component';
import { ServiceFormComponent } from './service-form.component';
import { ServiceDeleteModalComponent } from './service-delete-modal.component';
import { AdminServicesService } from '../services/admin-services.service';

const routes: Routes = [
  { path: '', component: ServicesListComponent },
  { path: 'nuevo', component: ServiceFormComponent },
  { path: ':id', component: ServiceFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ServicesListComponent,
    ServiceFormComponent,
    ServiceDeleteModalComponent
  ],
  providers: [
    AdminServicesService
  ]
})
export class ServicesManagerModule { }
