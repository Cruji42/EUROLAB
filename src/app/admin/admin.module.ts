import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersService } from './services/admin-users.service';
import { ServicesService } from '../services/services.service';
import { NewsService } from '../services/news.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { SidebarComponent } from './layout/sidebar.component';
import { HeaderComponent } from './layout/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgbModule,
    AdminRoutingModule,
    AdminLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent
  ],
  providers: [
    AdminUsersService,
    ServicesService,
    NewsService
  ]
})
export class AdminModule { }
