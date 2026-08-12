import { Routes } from '@angular/router';
import { CertificationListComponent } from './certification-list.component';
import { CertificationFormComponent } from './certification-form.component';
import { AdminCertificationsService } from '../services/admin-certifications.service';

export const CERTIFICATION_MANAGER_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminCertificationsService],
    children: [
      { path: '', component: CertificationListComponent },
      { path: 'nueva', component: CertificationFormComponent },
      { path: ':id', component: CertificationFormComponent }
    ]
  }
];
