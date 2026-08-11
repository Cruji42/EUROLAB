import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  AdminCertificationsService,
  Certification,
  CertificationCreate,
  CertificationUpdate
} from '../services/admin-certifications.service';

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss']
})
export class CertificationFormComponent implements OnInit {
  certForm!: FormGroup;
  certId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';

  coverPreview: string | null = null;
  uploadingCover = false;
  uploadingFile = false;
  fileUploaded = false;
  uploadedFileName = '';
  private translate = inject(TranslateService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private certService: AdminCertificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.isEditMode = true;
      this.loadCertification(slug);
    }
  }

  private initForm(): void {
    this.certForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(300)]],
      slug: ['', [Validators.required, Validators.maxLength(150), Validators.pattern(/^[a-z0-9-]+$/)]],
      issuing_body: ['', [Validators.required, Validators.maxLength(200)]],
      cert_type: ['', [Validators.required, Validators.maxLength(100)]],
      excerpt: ['', Validators.maxLength(500)],
      description: [''],
      cover_image_url: [''],
      certificate_file_url: [''],
      is_active: [true],
      is_featured: [false],
      issued_at: [null],
      expires_at: [null],
      meta_title: ['', Validators.maxLength(160)],
      meta_description: ['', Validators.maxLength(320)],
    });
  }

  private loadCertification(slug: string): void {
    this.loading = true;
    this.certService.getCertificationBySlug(slug).subscribe({
      next: (cert) => {
        this.certId = cert.id;
        this.patchForm(cert);
        this.loading = false;
      },
      error: (err) => {
        this.error = this.translate.instant('admin.certifications.errors.loadFailed', { message: err.message });
        this.loading = false;
      }
    });
  }

  private patchForm(cert: Certification): void {
    this.certForm.patchValue({
      title: cert.title,
      slug: cert.slug,
      issuing_body: cert.issuing_body,
      cert_type: cert.cert_type,
      excerpt: cert.excerpt,
      description: cert.description,
      cover_image_url: cert.cover_image_url,
      certificate_file_url: cert.certificate_file_url,
      is_active: cert.is_active,
      is_featured: cert.is_featured,
      issued_at: cert.issued_at ? new Date(cert.issued_at).toISOString().split('T')[0] : null,
      expires_at: cert.expires_at ? new Date(cert.expires_at).toISOString().split('T')[0] : null,
      meta_title: cert.meta_title,
      meta_description: cert.meta_description,
    });
    this.coverPreview = cert.cover_image_url || null;
    if (cert.certificate_file_url) {
      this.fileUploaded = true;
      this.uploadedFileName = cert.certificate_file_url.split('/').pop() || 'archivo subido';
    }
  }

  onCoverSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.coverPreview = reader.result as string);
    reader.readAsDataURL(file);
    this.uploadingCover = true;
    this.certService.uploadImage(file, 'certificaciones').subscribe({
      next: (url) => { this.certForm.patchValue({ cover_image_url: url }); this.uploadingCover = false; },
      error: (err) => { this.uploadingCover = false; this.error = err?.error?.detail ?? this.translate.instant('admin.certifications.errors.uploadImageFailed'); }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingFile = true;
    this.fileUploaded = false;
    this.certService.uploadFile(file, 'certificaciones-docs').subscribe({
      next: (url) => {
        this.certForm.patchValue({ certificate_file_url: url });
        this.fileUploaded = true;
        this.uploadedFileName = file.name;
        this.uploadingFile = false;
      },
      error: (err) => { this.uploadingFile = false; this.error = err?.error?.detail ?? this.translate.instant('admin.certifications.errors.uploadFileFailed'); }
    });
  }

  generateSlug(): void {
    const title = this.certForm.get('title');
    const slug = this.certForm.get('slug');
    if (title?.value && !slug?.value) {
      slug?.setValue(title.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'));
    }
  }

  onSubmit(): void {
    if (this.uploadingCover || this.uploadingFile) return;
    if (this.certForm.invalid) {
      Object.values(this.certForm.controls).forEach(c => c.markAsTouched());
      return;
    }
    this.submitting = true;
    this.error = '';
    const formData = { ...this.certForm.value };
    if (formData.issued_at) formData.issued_at = new Date(formData.issued_at).toISOString();
    if (formData.expires_at) formData.expires_at = new Date(formData.expires_at).toISOString();

    if (this.isEditMode && this.certId) {
      this.certService.updateCertification(this.certId, formData as CertificationUpdate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/certificaciones']); },
        error: (err) => { this.submitting = false; this.error = this.translate.instant('admin.certifications.errors.updateFailed', { message: err.message }); }
      });
    } else {
      this.certService.createCertification(formData as CertificationCreate).subscribe({
        next: () => { this.submitting = false; this.router.navigate(['/admin/certificaciones']); },
        error: (err) => { this.submitting = false; this.error = this.translate.instant('admin.certifications.errors.createFailed', { message: err.message }); }
      });
    }
  }

  fc(name: string) { return this.certForm.get(name); }
}
