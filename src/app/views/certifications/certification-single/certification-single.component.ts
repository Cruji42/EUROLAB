import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { CertificationsService } from '../../../services/certifications.service';
import { CertificationDetail } from '../../../models/certification.model';

@Component({
  selector: 'app-certification-single',
  imports: [CommonModule, RouterLink, DatePipe, BreadcrumbComponent],
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
      this.errorMessage = 'Certificación no encontrada.';
      this.isLoading = false;
      return;
    }
    this.certService.getCertificationBySlug(slug).subscribe({
      next: (data) => { this.cert = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'No se pudo cargar la certificación.'; this.isLoading = false; }
    });
  }
}
