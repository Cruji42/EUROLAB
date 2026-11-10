import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { BlogSingleSidebarComponent } from "./components/blog-single-sidebar/blog-single-sidebar.component";
import { BlogSingleMOreComponent } from "./components/blog-single-more/blog-single-more.component";
import { NewsService } from '../../../services/news.service';
import { NewsPostDetail } from '../../../models/news.model';
import { SeoService } from '../../../core/services/seo.service';
import { resolveAssetUrl } from '../../../core/utils/asset-url';

@Component({
  selector: 'app-blog-single',
  imports: [BreadcrumbComponent, BlogSingleSidebarComponent, BlogSingleMOreComponent, TranslatePipe],
  templateUrl: './blog-single.component.html',
  styles: ``
})
export class BlogSingleComponent implements OnInit {
  post: NewsPostDetail | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly seo: SeoService
  ) {}

  ngOnInit(): void {
    // Subscribe to the slug so opening another news item from this page reloads it
    this.route.paramMap.subscribe(params => this.loadPost(params.get('slug')));
  }

  private loadPost(slug: string | null): void {
    this.post = null;
    this.errorMessage = '';
    this.isLoading = true;

    if (!slug) {
      this.errorMessage = 'views.blogSingle.notFound';
      this.isLoading = false;
      return;
    }

    this.newsService.getNewsBySlug(slug).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
        this.seo.setPage({
          title: data.meta_title || data.title,
          description: data.meta_description || data.excerpt || data.content,
          image: resolveAssetUrl(data.cover_image_url),
          type: 'article',
        });
      },
      error: () => {
        this.errorMessage = 'views.blogSingle.loadError';
        this.isLoading = false;
        this.seo.setPage({ noindex: true });
      }
    });
  }
}
