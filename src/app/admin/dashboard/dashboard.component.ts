import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminServicesService, ServiceAdmin } from '../services/admin-services.service';
import { AdminNewsService, NewsPostAdmin } from '../services/admin-news.service';
import { AdminUsersService } from '../services/admin-users.service';
import { AdminSettingsService } from '../services/admin-settings.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  serviceCount = 0;
  newsCount = 0;
  userCount = 0;

  latestServices: ServiceAdmin[] = [];
  latestNews: NewsPostAdmin[] = [];

  loading = true;

  youtubeUrl = '';
  youtubeStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';

  constructor(
    private servicesService: AdminServicesService,
    private newsService: AdminNewsService,
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
    this.servicesService.getAllServices().subscribe({
      next: (services) => {
        this.serviceCount = services.length;
        this.latestServices = services.slice(0, 5);
        this.newsService.getAllNews(0, 5).subscribe({
          next: (news) => {
            this.newsCount = news.length;
            this.latestNews = news;
            this.usersService.getUsers().subscribe({
              next: (users) => {
                this.userCount = users.length;
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

  serviceName(service: ServiceAdmin): string {
    return service.translations.es.name || service.translations.en.name || '';
  }

  newsTitle(post: NewsPostAdmin): string {
    return post.translations.es.title || post.translations.en.title || '';
  }

  newsCategoryName(post: NewsPostAdmin): string {
    if (!post.category) {
      return '';
    }
    return post.category.translations.es.name || post.category.translations.en.name || '';
  }
}
