import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminUsersService } from './services/admin-users.service';
import { ServicesService } from '../services/services.service';
import { NewsService } from '../services/news.service';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AdminGuard],
    providers: [
      AdminUsersService,
      ServicesService,
      NewsService
    ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./services-manager/services-manager.routes').then(
            (m) => m.SERVICES_MANAGER_ROUTES
          )
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('./news-manager/news-manager.routes').then(
            (m) => m.NEWS_MANAGER_ROUTES
          )
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./users-manager/users-manager.routes').then(
            (m) => m.USERS_MANAGER_ROUTES
          )
      }
    ]
  }
];
