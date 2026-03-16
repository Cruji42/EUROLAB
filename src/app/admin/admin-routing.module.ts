import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'servicios',
        loadChildren: () => import('./services-manager/services-manager.module').then(m => m.ServicesManagerModule)
      },
      {
        path: 'noticias',
        loadChildren: () => import('./news-manager/news-manager.module').then(m => m.NewsManagerModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users-manager/users-manager.module').then(m => m.UsersManagerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
