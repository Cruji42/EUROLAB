import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicesService } from '../../services/services.service';
import { NewsService } from '../../services/news.service';
import { AdminUsersService } from '../services/admin-users.service';
import { ServiceCard, ServiceDetail } from '../../models/service.model';
import { NewsPostCard, NewsPostDetail } from '../../models/news.model';

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
    console.log('Loading dashboard data...');
    
    // Try loading services first to isolate potential issues
    this.servicesService.getAdminServices().subscribe({
      next: (services) => {
        console.log('Services loaded successfully:', services.length);
        this.serviceCount = services.length;
        // Now try loading news
        this.newsService.getAdminNews({ limit: 5 }).subscribe({
          next: (news) => {
            console.log('News loaded successfully:', news.length);
            this.newsCount = news.length;
            // Finally try loading users
            this.usersService.getUsers().subscribe({
              next: (users) => {
                console.log('Users loaded successfully:', users.length);
                
                // All data loaded successfully, update the UI
                
                
                this.userCount = users.length;
                
                // Convert ServiceDetail[] to ServiceCard[] for display
                this.latestServices = services.map(service => ({
                  id: service.id,
                  slug: service.slug,
                  name: service.name,
                  card_hover_text: service.card_hover_text,
                  card_icon_url: service.card_icon_url,
                  sort_order: service.sort_order
                })).slice(0, 5);
                
                // Convert NewsPostDetail[] to NewsPostCard[] for display
                this.latestNews = news.map(post => ({
                  id: post.id,
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  cover_image_url: post.cover_image_url,
                  author_name: post.author_name,
                  category: post.category,
                  tags: post.tags || [],
                  is_featured: post.is_featured,
                  published_at: post.published_at
                }));
                
                this.loading = false;
              },
              error: (error) => {
                console.error('Error loading users:', error);
                this.loading = false;
              }
            });
          },
          error: (error) => {
            console.error('Error loading news:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.loading = false;
      }
    });
  }
}
