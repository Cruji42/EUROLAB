import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminSliderService, BannerSlideAdmin, BannerSlideCreate, BannerSlideTranslation } from '../services/admin-slider.service';
import { TranslationLang, TranslationTabsComponent } from '../../shared/components/translation-tabs/translation-tabs.component';

@Component({
  selector: 'app-slider-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModalModule, TranslatePipe, TranslationTabsComponent],
  templateUrl: './slider-manager.component.html',
  styleUrls: ['./slider-manager.component.scss']
})
export class SliderManagerComponent implements OnInit {
  private translate = inject(TranslateService);

  @ViewChild('slideModal') slideModal!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  slides: BannerSlideAdmin[] = [];
  loading = true;
  submitting = false;
  uploading = false;
  error = '';
  successMsg = '';
  imagePreview: string | null = null;

  activeLang: TranslationLang = 'es';

  slideForm!: FormGroup;
  editingSlide: BannerSlideAdmin | null = null;
  slideToDelete: BannerSlideAdmin | null = null;
  modalRef?: NgbModalRef;

  constructor(
    private sliderService: AdminSliderService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSlides();
  }

  private buildTranslationGroup() {
    return this.fb.group({
      subtitle:           ['', Validators.required],
      title:              ['', Validators.required],
      description:        ['', Validators.required],
      btn_primary_text:   ['', Validators.required],
      btn_secondary_text: [''],
    });
  }

  private initForm(): void {
    this.slideForm = this.fb.group({
      sort_order:         [0, Validators.required],
      is_active:          [true],
      image_url:          ['', Validators.required],
      btn_primary_link:   ['/service', Validators.required],
      btn_secondary_link: ['/contact'],
      translations: this.fb.group({
        es: this.buildTranslationGroup(),
        en: this.buildTranslationGroup(),
      }),
    });
    const en = this.translations.get('en');
    en?.get('subtitle')?.clearValidators();
    en?.get('title')?.clearValidators();
    en?.get('description')?.clearValidators();
    en?.get('btn_primary_text')?.clearValidators();
    en?.get('subtitle')?.updateValueAndValidity();
    en?.get('title')?.updateValueAndValidity();
    en?.get('description')?.updateValueAndValidity();
    en?.get('btn_primary_text')?.updateValueAndValidity();
  }

  get translations(): FormGroup {
    return this.slideForm.get('translations') as FormGroup;
  }

  onLangChange(lang: TranslationLang): void {
    this.activeLang = lang;
  }

  loadSlides(): void {
    this.loading = true;
    this.sliderService.getAll().subscribe({
      next: (slides) => { this.slides = slides; this.loading = false; },
      error: () => { this.error = this.translate.instant('admin.slider.errors.loadFailed'); this.loading = false; }
    });
  }

  openCreate(): void {
    this.editingSlide = null;
    this.error = '';
    this.imagePreview = null;
    this.activeLang = 'es';
    this.slideForm.reset({
      sort_order: this.slides.length + 1,
      is_active: true,
      btn_primary_link: '/service',
      btn_secondary_link: '/contact',
    });
    this.modalRef = this.modalService.open(this.slideModal, { size: 'lg', backdrop: 'static' });
  }

  openEdit(slide: BannerSlideAdmin): void {
    this.editingSlide = slide;
    this.error = '';
    this.activeLang = 'es';
    this.imagePreview = slide.image_url
      ? this.resolvePreviewUrl(slide.image_url)
      : null;
    this.slideForm.patchValue({
      sort_order: slide.sort_order,
      is_active: slide.is_active,
      image_url: slide.image_url,
      btn_primary_link: slide.btn_primary_link,
      btn_secondary_link: slide.btn_secondary_link,
      translations: {
        es: slide.translations.es,
        en: slide.translations.en,
      },
    });
    this.modalRef = this.modalService.open(this.slideModal, { size: 'lg', backdrop: 'static' });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);

    this.uploading = true;
    this.error = '';
    this.sliderService.uploadImage(file).subscribe({
      next: (url) => {
        this.slideForm.patchValue({ image_url: url });
        this.uploading = false;
      },
      error: (err) => {
        this.uploading = false;
        this.error = err?.error?.detail ?? this.translate.instant('admin.slider.errors.uploadFailed');
      },
    });
  }

  private resolvePreviewUrl(url: string): string {
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    const apiBase = (window as any).__env?.apiBase ?? 'http://137.184.132.38:8009';
    return `${apiBase}/${url}`;
  }

  openDelete(slide: BannerSlideAdmin): void {
    this.slideToDelete = slide;
    this.modalService.open(this.deleteModal);
  }

  saveSlide(): void {
    if (this.uploading) return;
    if (this.slideForm.invalid) {
      this.slideForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';
    const { translations, ...nonTranslatable } = this.slideForm.value;

    if (this.editingSlide) {
      this.sliderService.update(this.editingSlide.id, nonTranslatable).subscribe({
        next: () => this.saveActiveTranslation(this.editingSlide!.id, translations),
        error: (err) => {
          this.submitting = false;
          this.error = err?.error?.detail ?? this.translate.instant('admin.slider.errors.saveFailed');
        }
      });
    } else {
      this.sliderService.create({ ...nonTranslatable, translations } as BannerSlideCreate).subscribe({
        next: () => this.onSaved('admin.slider.success.created'),
        error: (err) => {
          this.submitting = false;
          this.error = err?.error?.detail ?? this.translate.instant('admin.slider.errors.saveFailed');
        }
      });
    }
  }

  private saveActiveTranslation(slideId: number, translations: Record<TranslationLang, BannerSlideTranslation>): void {
    this.sliderService.updateTranslation(slideId, this.activeLang, translations[this.activeLang]).subscribe({
      next: () => this.onSaved('admin.slider.success.updated'),
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.detail ?? this.translate.instant('admin.slider.errors.saveFailed');
      }
    });
  }

  private onSaved(messageKey: string): void {
    this.submitting = false;
    this.modalRef?.close();
    this.showSuccess(this.translate.instant(messageKey));
    this.loadSlides();
  }

  confirmDelete(): void {
    if (!this.slideToDelete) return;
    this.sliderService.delete(this.slideToDelete.id).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.showSuccess(this.translate.instant('admin.slider.success.deleted'));
        this.loadSlides();
      },
      error: () => {
        this.modalService.dismissAll();
        this.error = this.translate.instant('admin.slider.errors.deleteFailed');
      }
    });
  }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => (this.successMsg = ''), 3000);
  }

  field(name: string) {
    return this.slideForm.get(name);
  }

  isInvalid(name: string): boolean {
    const c = this.field(name);
    return !!(c && c.invalid && c.touched);
  }

  tc(name: string) {
    return this.translations.get(`${this.activeLang}.${name}`);
  }

  isTcInvalid(name: string): boolean {
    const c = this.tc(name);
    return !!(c && c.invalid && c.touched);
  }
}
