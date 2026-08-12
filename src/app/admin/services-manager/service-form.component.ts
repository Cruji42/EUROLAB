import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  AdminServicesService,
  ServiceAdmin,
  ServiceCreate,
  ServiceNonTranslatableUpdate,
  ServiceTranslation,
  ServiceCheckAdmin,
  ServiceFAQAdmin,
} from '../services/admin-services.service';
import { TranslationLang, TranslationTabsComponent } from '../../shared/components/translation-tabs/translation-tabs.component';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe, TranslationTabsComponent],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';

  activeLang: TranslationLang = 'es';

  heroPreview: string | null = null;
  iconPreview: string | null = null;
  uploadingHero = false;
  uploadingIcon = false;
  private translate = inject(TranslateService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: AdminServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.serviceId = Number(idParam);
      this.loadService(this.serviceId);
    }
  }

  private buildServiceTranslationGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      breadcrumb: [''],
      body_p1: ['', Validators.required],
      body_p2: ['', Validators.required],
      sub_title: [''],
      sub_paragraph: [''],
      info_title: [''],
      info_paragraph: [''],
      desc_title: [''],
      desc_paragraph: [''],
      detail_title: [''],
      detail_paragraph: [''],
      card_hover_text: [''],
      meta_title: ['', Validators.maxLength(160)],
      meta_description: ['', Validators.maxLength(320)],
    });
  }

  private initForm(): void {
    this.serviceForm = this.fb.group({
      slug: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-z0-9-]+$/)]],
      hero_image_url: [''],
      card_icon_url: [''],
      is_active: [true],
      sort_order: [0],
      translations: this.fb.group({
        es: this.buildServiceTranslationGroup(),
        en: this.buildServiceTranslationGroup(),
      }),
      checks: this.fb.array([]),
      faqs: this.fb.array([])
    });

    const en = this.translations.get('en') as FormGroup;
    ['name', 'body_p1', 'body_p2'].forEach(field => {
      en.get(field)?.clearValidators();
      en.get(field)?.updateValueAndValidity();
    });
  }

  get translations(): FormGroup {
    return this.serviceForm.get('translations') as FormGroup;
  }

  onLangChange(lang: TranslationLang): void {
    this.activeLang = lang;
  }

  private loadService(id: number): void {
    this.loading = true;
    this.servicesService.getServiceById(id).subscribe({
      next: (service) => {
        this.serviceId = service.id;
        this.patchFormValues(service);
        this.loading = false;
      },
      error: (error) => {
        this.error = this.translate.instant('admin.services.errors.loadFailed', { message: error.message });
        this.loading = false;
      }
    });
  }

  private patchFormValues(service: ServiceAdmin): void {
    this.heroPreview = service.hero_image_url || null;
    this.iconPreview = service.card_icon_url || null;
    this.serviceForm.patchValue({
      slug: service.slug,
      hero_image_url: service.hero_image_url,
      card_icon_url: service.card_icon_url,
      is_active: service.is_active,
      sort_order: service.sort_order,
      translations: {
        es: service.translations.es,
        en: service.translations.en,
      },
    });

    this.checks.clear();
    service.checks.forEach(check => this.addCheck(check));

    this.faqs.clear();
    service.faqs.forEach(faq => this.addFaq(faq));
  }

  get checks(): FormArray {
    return this.serviceForm.get('checks') as FormArray;
  }

  get faqs(): FormArray {
    return this.serviceForm.get('faqs') as FormArray;
  }

  addCheck(existing?: ServiceCheckAdmin): void {
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

  addFaq(existing?: ServiceFAQAdmin): void {
    this.faqs.push(
      this.fb.group({
        sort_order: [existing?.sort_order ?? 0],
        translations: this.fb.group({
          es: this.fb.group({
            question: [existing?.translations.es.question ?? '', Validators.required],
            answer: [existing?.translations.es.answer ?? '', Validators.required],
          }),
          en: this.fb.group({
            question: [existing?.translations.en.question ?? ''],
            answer: [existing?.translations.en.answer ?? ''],
          }),
        }),
      })
    );
  }

  removeFaq(index: number): void {
    this.faqs.removeAt(index);
  }

  checkTranslations(index: number): FormGroup {
    return this.checks.at(index).get('translations') as FormGroup;
  }

  faqTranslations(index: number): FormGroup {
    return this.faqs.at(index).get('translations') as FormGroup;
  }

  getFaqOrderControl(index: number): FormControl {
    return this.faqs.at(index).get('sort_order') as FormControl;
  }

  onHeroSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.heroPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingHero = true;
    this.servicesService.uploadImage(file, 'servicios').subscribe({
      next: (url) => { this.serviceForm.patchValue({ hero_image_url: url }); this.uploadingHero = false; },
      error: (err) => { this.uploadingHero = false; this.error = err?.error?.detail ?? this.translate.instant('admin.services.errors.uploadHeroFailed'); }
    });
  }

  onIconSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.iconPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingIcon = true;
    this.servicesService.uploadImage(file, 'servicios').subscribe({
      next: (url) => { this.serviceForm.patchValue({ card_icon_url: url }); this.uploadingIcon = false; },
      error: (err) => { this.uploadingIcon = false; this.error = err?.error?.detail ?? this.translate.instant('admin.services.errors.uploadIconFailed'); }
    });
  }

  onSubmit(): void {
    if (this.uploadingHero || this.uploadingIcon) return;
    if (this.serviceForm.invalid) {
      this.markFormGroupTouched(this.serviceForm);
      return;
    }

    this.submitting = true;
    this.error = '';

    const { translations, ...nonTranslatable } = this.serviceForm.value;

    if (this.isEditMode && this.serviceId) {
      this.servicesService.updateService(this.serviceId, nonTranslatable as ServiceNonTranslatableUpdate).subscribe({
        next: () => this.saveActiveTranslation(translations),
        error: (error) => {
          this.submitting = false;
          this.error = this.translate.instant('admin.services.errors.updateFailed', { message: error.message });
        }
      });
    } else {
      this.servicesService.createService({ ...nonTranslatable, translations } as ServiceCreate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/servicios']); },
        error: (error) => {
          this.submitting = false;
          this.error = this.translate.instant('admin.services.errors.createFailed', { message: error.message });
        }
      });
    }
  }

  private saveActiveTranslation(translations: Record<TranslationLang, ServiceTranslation>): void {
    if (!this.serviceId) return;
    this.servicesService.updateTranslation(this.serviceId, this.activeLang, translations[this.activeLang]).subscribe({
      next: () => { this.submitting = false; this.router.navigate(['/admin/servicios']); },
      error: (error) => {
        this.submitting = false;
        this.error = this.translate.instant('admin.services.errors.updateFailed', { message: error.message });
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getFormControl(name: string) {
    return this.serviceForm.get(name);
  }

  tc(name: string) {
    return this.translations.get(`${this.activeLang}.${name}`);
  }

  generateSlug(): void {
    const nameControl = this.translations.get('es.name');
    const slugControl = this.serviceForm.get('slug');

    if (nameControl && slugControl && nameControl.value && !slugControl.value) {
      const slug = nameControl.value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      slugControl.setValue(slug);
    }
  }
}
