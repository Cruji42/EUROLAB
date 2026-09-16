import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  AdminTeamService,
  TeamMemberAdmin,
  TeamMemberCreate,
  TeamMemberNonTranslatableUpdate,
  TeamMemberTranslation
} from '../services/admin-team.service';
import { TranslationLang, TranslationTabsComponent } from '../../shared/components/translation-tabs/translation-tabs.component';
import { resolveAssetUrl } from '../../core/utils/asset-url';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe, TranslationTabsComponent],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  memberForm!: FormGroup;
  memberId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';

  activeLang: TranslationLang = 'es';

  photoPreview: string | null = null;
  uploadingPhoto = false;
  private translate = inject(TranslateService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: AdminTeamService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.memberId = Number(id);
      this.loadMember(this.memberId);
    }
  }

  private buildTranslationGroup() {
    return this.fb.group({
      role: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  private initForm(): void {
    this.memberForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.email, Validators.maxLength(200)]],
      phone: ['', Validators.maxLength(50)],
      image_url: [''],
      sort_order: [0],
      is_active: [true],
      translations: this.fb.group({
        es: this.buildTranslationGroup(),
        en: this.buildTranslationGroup(),
      }),
    });
    // El inglés no es obligatorio: se traduce después desde el admin.
    const en = this.translations.get('en');
    en?.get('role')?.clearValidators();
    en?.get('role')?.updateValueAndValidity();
  }

  get translations(): FormGroup {
    return this.memberForm.get('translations') as FormGroup;
  }

  onLangChange(lang: TranslationLang): void {
    this.activeLang = lang;
  }

  private loadMember(id: number): void {
    this.loading = true;
    this.teamService.getMemberById(id).subscribe({
      next: (member) => {
        this.memberId = member.id;
        this.patchForm(member);
        this.loading = false;
      },
      error: (err) => {
        this.error = this.translate.instant('admin.team.errors.loadFailed', { message: err.message });
        this.loading = false;
      }
    });
  }

  private patchForm(member: TeamMemberAdmin): void {
    this.memberForm.patchValue({
      name: member.name,
      email: member.email,
      phone: member.phone,
      image_url: member.image_url,
      sort_order: member.sort_order,
      is_active: member.is_active,
      translations: {
        es: member.translations.es,
        en: member.translations.en,
      },
    });
    this.photoPreview = resolveAssetUrl(member.image_url);
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.photoPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingPhoto = true;
    this.teamService.uploadImage(file, 'equipo').subscribe({
      next: (url) => { this.memberForm.patchValue({ image_url: url }); this.uploadingPhoto = false; },
      error: (err) => { this.uploadingPhoto = false; this.error = err?.error?.detail ?? this.translate.instant('admin.team.errors.uploadImageFailed'); }
    });
  }

  onSubmit(): void {
    if (this.uploadingPhoto) return;
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';

    const { translations, ...nonTranslatable } = this.memberForm.value;

    if (this.isEditMode && this.memberId) {
      this.teamService.updateMember(this.memberId, nonTranslatable as TeamMemberNonTranslatableUpdate).subscribe({
        next: () => this.saveActiveTranslation(translations),
        error: (err) => { this.submitting = false; this.error = this.translate.instant('admin.team.errors.updateFailed', { message: err.message }); }
      });
    } else {
      this.teamService.createMember({ ...nonTranslatable, translations } as TeamMemberCreate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/equipo']); },
        error: (err) => { this.submitting = false; this.error = this.translate.instant('admin.team.errors.createFailed', { message: err.message }); }
      });
    }
  }

  private saveActiveTranslation(translations: { es: TeamMemberTranslation; en: TeamMemberTranslation }): void {
    if (!this.memberId) return;
    this.teamService.updateTranslation(this.memberId, this.activeLang, translations[this.activeLang]).subscribe({
      next: () => { this.submitting = false; this.router.navigate(['/admin/equipo']); },
      error: (err) => { this.submitting = false; this.error = this.translate.instant('admin.team.errors.updateFailed', { message: err.message }); }
    });
  }

  fc(name: string) { return this.memberForm.get(name); }
  tc(name: string) { return this.translations.get(`${this.activeLang}.${name}`); }
}
