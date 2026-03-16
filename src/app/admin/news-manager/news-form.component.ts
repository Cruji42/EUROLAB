import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNewsService, NewsPost, NewsCategory, NewsPostCreate, NewsPostUpdate } from '../services/admin-news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  newsForm!: FormGroup;
  newsId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';
  categories: NewsCategory[] = [];
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: AdminNewsService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    
    // Check if we're in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.newsId = +idParam;
      this.isEditMode = true;
      this.loadNews(this.newsId);
    }
  }
  
  private initForm(): void {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(300)]],
      slug: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[a-z0-9-]+$/)]],
      excerpt: ['', Validators.maxLength(500)],
      content: ['', Validators.required],
      cover_image_url: [''],
      author_name: ['', Validators.maxLength(150)],
      author_image_url: [''],
      category_id: [null],
      meta_title: ['', Validators.maxLength(160)],
      meta_description: ['', Validators.maxLength(320)],
      is_published: [false],
      is_featured: [false],
      published_at: [null]
    });
  }
  
  private loadCategories(): void {
    this.newsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }
  
  private loadNews(id: number): void {
    this.loading = true;
    
    this.newsService.getNewsById(id).subscribe({
      next: (news) => {
        this.patchFormValues(news);
        this.loading = false;
      },
      error: (error) => {
        this.error = `Error al cargar la noticia: ${error.message}`;
        this.loading = false;
        console.error('Error loading news', error);
      }
    });
  }
  
  private patchFormValues(news: NewsPost): void {
    // Format the date for the form
    let publishedAt = null;
    if (news.published_at) {
      const date = new Date(news.published_at);
      publishedAt = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    
    this.newsForm.patchValue({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      content: news.content,
      cover_image_url: news.cover_image_url,
      author_name: news.author_name,
      author_image_url: news.author_image_url,
      category_id: news.category_id,
      meta_title: news.meta_title,
      meta_description: news.meta_description,
      is_published: news.is_published,
      is_featured: news.is_featured,
      published_at: publishedAt
    });
  }
  
  onSubmit(): void {
    if (this.newsForm.invalid) {
      this.markFormGroupTouched(this.newsForm);
      return;
    }
    
    this.submitting = true;
    this.error = '';
    
    const formData = this.newsForm.value;
    
    // Format the date for the API
    if (formData.published_at && formData.is_published) {
      formData.published_at = new Date(formData.published_at).toISOString();
    } else if (!formData.is_published) {
      formData.published_at = null;
    }
    
    if (this.isEditMode && this.newsId) {
      // Update existing news
      this.newsService.updateNews(this.newsId, formData as NewsPostUpdate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/noticias']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al actualizar la noticia: ${error.message}`;
          console.error('Error updating news', error);
        }
      });
    } else {
      // Create new news
      this.newsService.createNews(formData as NewsPostCreate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/noticias']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al crear la noticia: ${error.message}`;
          console.error('Error creating news', error);
        }
      });
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  // Helper for template
  getFormControl(name: string) {
    return this.newsForm.get(name);
  }
  
  // Generate slug from title
  generateSlug(): void {
    const titleControl = this.newsForm.get('title');
    const slugControl = this.newsForm.get('slug');
    
    if (titleControl && slugControl && titleControl.value && !slugControl.value) {
      const slug = titleControl.value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      slugControl.setValue(slug);
    }
  }
  
  // Toggle published_at field based on is_published
  onPublishedChange(): void {
    const isPublished = this.newsForm.get('is_published')?.value;
    const publishedAtControl = this.newsForm.get('published_at');
    
    if (isPublished && !publishedAtControl?.value) {
      // Set current date if published is checked and no date is set
      const today = new Date().toISOString().split('T')[0];
      publishedAtControl?.setValue(today);
    }
  }
}
