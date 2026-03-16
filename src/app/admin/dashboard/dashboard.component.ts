import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import { NewsService } from '../../services/news.service';
import { AdminUsersService } from '../services/admin-users.service';
import { ServiceCard } from '../../models/service.model';
import { NewsPostCard } from '../../models/news.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  serviceCount = 0;
  newsCount = 0;
  userCount = 0;
  
  latestServices: ServiceCard[] = [];
  latestNews: NewsPostCard[] = [];
  
  loading = true;
  
  constructor(
    private servicesService: ServicesService,
    private newsService: NewsService,
    private usersService: AdminUsersService
  ) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    // Get counts and latest items
    forkJoin({
      services: this.servicesService.getServices(),
      news: this.newsService.getNews({ limit: 5 }),
      users: this.usersService.getUsers()
    }).subscribe({
      next: (results) => {
        this.serviceCount = results.services.length;
        this.newsCount = results.news.length;
        this.userCount = results.users.length;
        
        this.latestServices = results.services.slice(0, 5);
        this.latestNews = results.news;
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data', error);
        this.loading = false;
      }
    });
  }
}
