import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NewsService } from '../../../services/news.service';
import { NewsPostCard } from '../../../models/news.model';

@Component({
  selector: 'app-blog',
  imports: [BreadcrumbComponent, RouterLink, DatePipe, TranslatePipe],
  templateUrl: './blog.component.html',
  styles: ``
})
export class BlogComponent implements OnInit {
  posts: NewsPostCard[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews({ limit: 50 }).subscribe({
      next: (data) => {
        this.posts = data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'views.blog.loadError';
        this.isLoading = false;
      }
    });
  }
}
