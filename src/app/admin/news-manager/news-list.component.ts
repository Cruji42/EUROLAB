import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminNewsService, NewsPost, NewsCategory } from '../services/admin-news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsDeleteModalComponent } from './news-delete-modal.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsPosts: NewsPost[] = [];
  filteredPosts: NewsPost[] = [];
  categories: NewsCategory[] = [];
  loading = true;
  searchTerm = '';
  selectedCategory: string | null = null;
  
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
    
    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(post => 
        post.category && post.category.slug === this.selectedCategory
      );
    }
    
    // Apply search term filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(term))
      );
    }
    
    this.filteredPosts = filtered;
  }
  
  openDeleteModal(post: NewsPost): void {
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
  
  getStatusBadgeClass(post: NewsPost): string {
    return post.is_published ? 'bg-success' : 'bg-secondary';
  }
  
  getStatusText(post: NewsPost): string {
    return post.is_published ? 'Publicado' : 'Borrador';
  }
}
