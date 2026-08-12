import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { CertificationsService } from '../../../services/certifications.service';
import { CertificationDetail } from '../../../models/certification.model';
import { resolveAssetUrl } from '../../../core/utils/asset-url';

@Component({
  selector: 'app-certification-single',
  imports: [CommonModule, RouterLink, DatePipe, BreadcrumbComponent, TranslatePipe],
  templateUrl: './certification-single.component.html',
  styles: ``
})
export class CertificationSingleComponent implements OnInit {
  cert: CertificationDetail | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly certService: CertificationsService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.errorMessage = 'views.certificationSingle.notFound';
      this.isLoading = false;
      return;
    }
    this.certService.getCertificationBySlug(slug).subscribe({
      next: (data) => { this.cert = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'views.certificationSingle.loadError'; this.isLoading = false; }
    });
  }

  get certificateDownloadUrl(): string | null {
    return resolveAssetUrl(this.cert?.certificate_file_url);
  }

  get coverImageUrl(): string | null {
    return resolveAssetUrl(this.cert?.cover_image_url);
  }
}
