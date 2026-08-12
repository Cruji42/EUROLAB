import { Routes } from '@angular/router';
import { ServicesListComponent } from './services-list.component';
import { ServiceFormComponent } from './service-form.component';
import { AdminServicesService } from '../services/admin-services.service';

export const SERVICES_MANAGER_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminServicesService],
    children: [
      { path: '', component: ServicesListComponent },
      { path: 'nuevo', component: ServiceFormComponent },
      { path: ':id', component: ServiceFormComponent }
    ]
  }
];
