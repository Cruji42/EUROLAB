import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  AdminNewsService,
  NewsPostAdmin,
  NewsCategorySimple,
  NewsTagSimple,
  NewsCheckAdmin,
  NewsPostCreate,
  NewsPostNonTranslatableUpdate,
  NewsPostTranslation,
} from '../services/admin-news.service';
import { TranslationLang, TranslationTabsComponent } from '../../shared/components/translation-tabs/translation-tabs.component';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe, TranslationTabsComponent],
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
  categories: NewsCategorySimple[] = [];
  allTags: NewsTagSimple[] = [];
  allPosts: NewsPostAdmin[] = [];

  activeLang: TranslationLang = 'es';

  coverPreview: string | null = null;
  authorPreview: string | null = null;
  uploadingCover = false;
  uploadingAuthor = false;
  private translate = inject(TranslateService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: AdminNewsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadTags();
    this.loadAllPosts();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.newsId = Number(idParam);
      this.loadNews(this.newsId);
    }
  }

  private buildTranslationGroup() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(300)]],
      breadcrumb: [''],
      section1_title: [''],
      section1_paragraph: [''],
      section2_title: [''],
      section2_paragraph1: [''],
      section2_paragraph2: [''],
      section3_title: [''],
      section3_paragraph1: [''],
      section3_paragraph2: [''],
      section4_title: [''],
      section4_paragraph: [''],
      blockquote: [''],
      section5_title: [''],
      section5_paragraph: [''],
      excerpt: ['', Validators.maxLength(500)],
      meta_title: ['', Validators.maxLength(160)],
      meta_description: ['', Validators.maxLength(320)],
    });
  }

  private initForm(): void {
    this.newsForm = this.fb.group({
      slug: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[a-z0-9-]+$/)]],
      cover_image_url: [''],
      author_name: ['', Validators.maxLength(150)],
      author_image_url: [''],
      category_id: [null],
      is_published: [false],
      is_featured: [false],
      published_at: [null],
      translations: this.fb.group({
        es: this.buildTranslationGroup(),
        en: this.buildTranslationGroup(),
      }),
      checks: this.fb.array([]),
      tag_ids: [[] as number[]],
      related_post_ids: [[] as number[]],
    });

    const en = this.translations.get('en');
    en?.get('title')?.clearValidators();
    en?.get('title')?.updateValueAndValidity();
  }

  get translations(): FormGroup {
    return this.newsForm.get('translations') as FormGroup;
  }

  get checks(): FormArray {
    return this.newsForm.get('checks') as FormArray;
  }

  onLangChange(lang: TranslationLang): void {
    this.activeLang = lang;
  }

  private loadCategories(): void {
    this.newsService.getCategories().subscribe({
      next: (categories) => { this.categories = categories; },
      error: () => {}
    });
  }

  private loadTags(): void {
    this.newsService.getTags().subscribe({
      next: (tags) => { this.allTags = tags; },
      error: () => {}
    });
  }

  private loadAllPosts(): void {
    this.newsService.getAllNews(0, 100).subscribe({
      next: (posts) => { this.allPosts = posts; },
      error: () => {}
    });
  }

  private loadNews(id: number): void {
    this.loading = true;
    this.newsService.getNewsById(id).subscribe({
      next: (news) => {
        this.newsId = news.id;
        this.patchFormValues(news);
        this.loading = false;
      },
      error: (error) => {
        this.error = this.translate.instant('admin.news.errors.loadFailed', { message: error.message });
        this.loading = false;
      }
    });
  }

  private patchFormValues(news: NewsPostAdmin): void {
    let publishedAt = null;
    if (news.published_at) {
      publishedAt = new Date(news.published_at).toISOString().split('T')[0];
    }
    this.newsForm.patchValue({
      slug: news.slug,
      cover_image_url: news.cover_image_url,
      author_name: news.author_name,
      author_image_url: news.author_image_url,
      category_id: news.category_id ?? null,
      is_published: news.is_published,
      is_featured: news.is_featured,
      published_at: publishedAt,
      translations: {
        es: news.translations.es,
        en: news.translations.en,
      },
      tag_ids: news.tags.map(t => t.id),
      related_post_ids: news.related_post_ids,
    });
    this.coverPreview = news.cover_image_url || null;
    this.authorPreview = news.author_image_url || null;

    this.checks.clear();
    news.checks.forEach(check => this.addCheck(check));
  }

  addCheck(existing?: NewsCheckAdmin): void {
    this.checks.push(
      this.fb.group({
        sort_order: [existing?.sort_order ?? 0],
        translations: this.fb.group({
          es: this.fb.group({ label: [existing?.translations.es.label ?? '', Validators.required] }),
          en: this.fb.group({ label: [existing?.translations.en.label ?? ''] }),
        }),
      })
    );
  }

  removeCheck(index: number): void {
    this.checks.removeAt(index);
  }

  checkTranslations(index: number): FormGroup {
    return this.checks.at(index).get('translations') as FormGroup;
  }

  toggleTag(tagId: number): void {
    const control = this.newsForm.get('tag_ids');
    const current: number[] = control?.value ?? [];
    const next = current.includes(tagId)
      ? current.filter(id => id !== tagId)
      : [...current, tagId];
    control?.setValue(next);
  }

  isTagSelected(tagId: number): boolean {
    const current: number[] = this.newsForm.get('tag_ids')?.value ?? [];
    return current.includes(tagId);
  }

  toggleRelated(postId: number): void {
    const control = this.newsForm.get('related_post_ids');
    const current: number[] = control?.value ?? [];
    const next = current.includes(postId)
      ? current.filter(id => id !== postId)
      : [...current, postId];
    control?.setValue(next);
  }

  isRelatedSelected(postId: number): boolean {
    const current: number[] = this.newsForm.get('related_post_ids')?.value ?? [];
    return current.includes(postId);
  }

  tagName(tag: NewsTagSimple): string {
    return tag.name;
  }

  categoryName(category: NewsCategorySimple): string {
    return category.name;
  }

  postTitle(post: NewsPostAdmin): string {
    return post.translations.es.title || post.translations.en.title || '';
  }

  otherPosts(): NewsPostAdmin[] {
    return this.allPosts.filter(p => p.id !== this.newsId);
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
      error: (err) => { this.uploadingCover = false; this.error = err?.error?.detail ?? this.translate.instant('admin.news.errors.uploadCoverFailed'); }
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
      error: (err) => { this.uploadingAuthor = false; this.error = err?.error?.detail ?? this.translate.instant('admin.news.errors.uploadAuthorFailed'); }
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

    const { translations, ...nonTranslatable } = this.newsForm.value;
    if (nonTranslatable.published_at && nonTranslatable.is_published) {
      nonTranslatable.published_at = new Date(nonTranslatable.published_at).toISOString();
    } else if (!nonTranslatable.is_published) {
      nonTranslatable.published_at = null;
    }

    if (this.isEditMode && this.newsId) {
      this.newsService.updateNews(this.newsId, nonTranslatable as NewsPostNonTranslatableUpdate).subscribe({
        next: () => this.saveActiveTranslation(translations),
        error: (error) => {
          this.submitting = false;
          this.error = this.translate.instant('admin.news.errors.updateFailed', { message: error.message });
        }
      });
    } else {
      this.newsService.createNews({ ...nonTranslatable, translations } as NewsPostCreate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/noticias']); },
        error: (error) => {
          this.submitting = false;
          this.error = this.translate.instant('admin.news.errors.createFailed', { message: error.message });
        }
      });
    }
  }

  private saveActiveTranslation(translations: Record<TranslationLang, NewsPostTranslation>): void {
    if (!this.newsId) return;
    this.newsService.updateTranslation(this.newsId, this.activeLang, translations[this.activeLang]).subscribe({
      next: () => { this.submitting = false; this.router.navigate(['/admin/noticias']); },
      error: (error) => {
        this.submitting = false;
        this.error = this.translate.instant('admin.news.errors.updateFailed', { message: error.message });
      }
    });
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

  tc(name: string) {
    return this.translations.get(`${this.activeLang}.${name}`);
  }

  generateSlug(): void {
    const title = this.translations.get('es.title');
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
