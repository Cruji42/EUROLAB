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
  styles: [`
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .row > [class*="col-"] {
    display: flex;
  }

  .ca-team-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .ca-team-img {
    position: relative;
    flex-shrink: 0;
  }

  .ca-blog-box-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ca-blog-box-content p {
    flex: 1;
  }

  /* Fix: la fecha debe quedar sobre la imagen, no sobre el meta de abajo */
  .ca-blog-date-3 {
    position: absolute;
    top: 16px;
    right: 16px;
    bottom: auto;
    z-index: 2;
  }

  .ca-b-meta {
    position: relative;
    z-index: 1;
  }
`]
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
