import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminNewsService, NewsPostAdmin, NewsCategoryAdmin } from '../services/admin-news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NewsDeleteModalComponent } from './news-delete-modal.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsPosts: NewsPostAdmin[] = [];
  filteredPosts: NewsPostAdmin[] = [];
  categories: NewsCategoryAdmin[] = [];
  loading = true;
  searchTerm = '';
  selectedCategory: string | null = null;
  private translate = inject(TranslateService);

  constructor(
    private newsService: AdminNewsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadNews();
    this.loadCategories();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getAllNews().subscribe({
      next: (posts) => {
        this.newsPosts = posts;
        this.filteredPosts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading news', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.newsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  filterByCategory(categorySlug: string | null): void {
    this.selectedCategory = categorySlug;
    this.applyFilters();
  }

  search(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.newsPosts;

    if (this.selectedCategory) {
      filtered = filtered.filter(post =>
        post.category && post.category.slug === this.selectedCategory
      );
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post => {
        const title = this.title(post).toLowerCase();
        const excerpt = (post.translations.es.excerpt || post.translations.en.excerpt || '').toLowerCase();
        return title.includes(term) || excerpt.includes(term);
      });
    }

    this.filteredPosts = filtered;
  }

  openDeleteModal(post: NewsPostAdmin): void {
    const modalRef = this.modalService.open(NewsDeleteModalComponent);
    modalRef.componentInstance.post = post;

    modalRef.result.then(
      (result) => {
        if (result === 'deleted') {
          this.loadNews();
        }
      },
      () => {} // Dismissed
    );
  }

  getStatusBadgeClass(post: NewsPostAdmin): string {
    return post.is_published ? 'bg-success' : 'bg-secondary';
  }

  getStatusText(post: NewsPostAdmin): string {
    return this.translate.instant(post.is_published ? 'admin.news.list.published' : 'admin.news.list.draft');
  }

  title(post: NewsPostAdmin): string {
    return post.translations.es.title || post.translations.en.title || '';
  }

  categoryName(category: NewsCategoryAdmin): string {
    return category.translations.es.name || category.translations.en.name || '';
  }
}
