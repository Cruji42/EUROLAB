import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NewsService } from '../../../../../services/news.service';
import { NewsPostCard, NewsPostDetail } from '../../../../../models/news.model';
import { LocalizedDatePipe } from '../../../../../core/pipes/localized-date.pipe';

const MAX_POSTS = 3;

@Component({
  selector: 'app-blog-single-more',
  imports: [CommonModule, RouterLink, TranslatePipe, LocalizedDatePipe],
  templateUrl: './blog-single-more.component.html',
  styles: ``
})
export class BlogSingleMOreComponent implements OnChanges {
  @Input() post: NewsPostDetail | null = null;
  blogPosts: NewsPostCard[] = [];

  constructor(private readonly newsService: NewsService) {}

  ngOnChanges(): void {
    if (!this.post) {
      this.blogPosts = [];
      return;
    }

    const currentId = this.post.id;
    const related = (this.post.related_posts ?? []).filter(p => p.id !== currentId);

    // Prioritize the related posts from the API and fill with the latest news
    this.newsService.getNews({ limit: MAX_POSTS + 1 }).subscribe({
      next: (latest) => {
        const seen = new Set(related.map(p => p.id));
        const extra = (latest ?? []).filter(p => p.id !== currentId && !seen.has(p.id));
        this.blogPosts = [...related, ...extra].slice(0, MAX_POSTS);
      },
      error: () => {
        this.blogPosts = related.slice(0, MAX_POSTS);
      }
    });
  }
}
