import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNewsService, NewsPost, NewsCategory, NewsPostCreate, NewsPostUpdate } from '../services/admin-news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  coverPreview: string | null = null;
  authorPreview: string | null = null;
  uploadingCover = false;
  uploadingAuthor = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: AdminNewsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();

    const slugParam = this.route.snapshot.paramMap.get('slug');
    if (slugParam) {
      this.isEditMode = true;
      this.loadNews(slugParam);
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
      next: (categories) => { this.categories = categories; },
      error: () => {}
    });
  }

  private loadNews(slug: string): void {
    this.loading = true;
    this.newsService.getNewsBySlug(slug).subscribe({
      next: (news) => {
        this.newsId = news.id;
        this.patchFormValues(news);
        this.loading = false;
      },
      error: (error) => {
        this.error = `Error al cargar la noticia: ${error.message}`;
        this.loading = false;
      }
    });
  }

  private patchFormValues(news: NewsPost): void {
    let publishedAt = null;
    if (news.published_at) {
      publishedAt = new Date(news.published_at).toISOString().split('T')[0];
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
    this.coverPreview = news.cover_image_url || null;
    this.authorPreview = news.author_image_url || null;
  }

  onCoverSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.coverPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingCover = true;
    this.newsService.uploadImage(file, 'noticias').subscribe({
      next: (url) => { this.newsForm.patchValue({ cover_image_url: url }); this.uploadingCover = false; },
      error: (err) => { this.uploadingCover = false; this.error = err?.error?.detail ?? 'Error al subir imagen de portada.'; }
    });
  }

  onAuthorSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.authorPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingAuthor = true;
    this.newsService.uploadImage(file, 'autores').subscribe({
      next: (url) => { this.newsForm.patchValue({ author_image_url: url }); this.uploadingAuthor = false; },
      error: (err) => { this.uploadingAuthor = false; this.error = err?.error?.detail ?? 'Error al subir imagen del autor.'; }
    });
  }

  onSubmit(): void {
    if (this.uploadingCover || this.uploadingAuthor) return;
    if (this.newsForm.invalid) {
      this.markFormGroupTouched(this.newsForm);
      return;
    }
    this.submitting = true;
    this.error = '';
    const formData = { ...this.newsForm.value };
    if (formData.published_at && formData.is_published) {
      formData.published_at = new Date(formData.published_at).toISOString();
    } else if (!formData.is_published) {
      formData.published_at = null;
    }
    if (this.isEditMode && this.newsId) {
      this.newsService.updateNews(this.newsId, formData as NewsPostUpdate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/noticias']); },
        error: (error) => { this.submitting = false; this.error = `Error al actualizar la noticia: ${error.message}`; }
      });
    } else {
      this.newsService.createNews(formData as NewsPostCreate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/noticias']); },
        error: (error) => { this.submitting = false; this.error = `Error al crear la noticia: ${error.message}`; }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) this.markFormGroupTouched(control);
    });
  }

  getFormControl(name: string) {
    return this.newsForm.get(name);
  }

  generateSlug(): void {
    const title = this.newsForm.get('title');
    const slug = this.newsForm.get('slug');
    if (title && slug && title.value && !slug.value) {
      slug.setValue(title.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'));
    }
  }

  onPublishedChange(): void {
    const isPublished = this.newsForm.get('is_published')?.value;
    const publishedAt = this.newsForm.get('published_at');
    if (isPublished && !publishedAt?.value) {
      publishedAt?.setValue(new Date().toISOString().split('T')[0]);
    }
  }
}
