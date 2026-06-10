import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { NewsService } from '../../services/news.service';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminSettingsService } from '../services/admin-settings.service';
import { ServiceCard } from '../../models/service.model';
import { NewsPostCard } from '../../models/news.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
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

  youtubeUrl = '';
  youtubeStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';

  constructor(
    private servicesService: ServicesService,
    private newsService: NewsService,
    private usersService: AdminUsersService,
    private settingsService: AdminSettingsService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.settingsService.getYoutubeUrl().subscribe({
      next: (data) => this.youtubeUrl = data.youtube_url,
    });
  }

  saveYoutubeUrl(): void {
    this.youtubeStatus = 'saving';
    this.settingsService.updateYoutubeUrl(this.youtubeUrl).subscribe({
      next: () => {
        this.youtubeStatus = 'saved';
        setTimeout(() => this.youtubeStatus = 'idle', 3000);
      },
      error: () => {
        this.youtubeStatus = 'error';
        setTimeout(() => this.youtubeStatus = 'idle', 3000);
      }
    });
  }

  loadDashboardData(): void {
    this.servicesService.getAdminServices().subscribe({
      next: (services) => {
        this.serviceCount = services.length;
        this.newsService.getAdminNews({ limit: 5 }).subscribe({
          next: (news) => {
            this.newsCount = news.length;
            this.usersService.getUsers().subscribe({
              next: (users) => {
                this.userCount = users.length;
                this.latestServices = services.map(service => ({
                  id: service.id,
                  slug: service.slug,
                  name: service.name,
                  card_hover_text: service.card_hover_text,
                  card_icon_url: service.card_icon_url,
                  sort_order: service.sort_order
                })).slice(0, 5);
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
              error: () => this.loading = false
            });
          },
          error: () => this.loading = false
        });
      },
      error: () => this.loading = false
    });
  }
}
