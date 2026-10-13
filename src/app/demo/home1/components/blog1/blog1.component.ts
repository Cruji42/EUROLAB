import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { CertificationsService } from '../../../../services/certifications.service';
import { CertificationCard } from '../../../../models/certification.model';
import { resolveAssetUrl } from '../../../../core/utils/asset-url';

@Component({
  selector: 'app-blog1',
  imports: [RouterLink, CommonModule, TranslatePipe],
  templateUrl: './blog1.component.html',
  styles: ``
})
export class Blog1Component implements OnInit {
  certifications: CertificationCard[] = [];
  isLoading = true;

  private readonly fallback: CertificationCard[] = [
    {
      id: 1, slug: 'acreditacion-ema-a-0667', title: 'Acreditación EMA A-0667-063/15',
      issuing_body: 'EMA', cert_type: 'Acreditación',
      excerpt: 'Acreditación de la Entidad Mexicana de Acreditación para ensayos clínicos y análisis de laboratorio.',
      cover_image_url: 'assets/img/blog/ca-blog-1.2.png', certificate_file_url: null,
      is_active: true, issued_at: null, expires_at: null
    },
    {
      id: 2, slug: 'acreditacion-ema-sa-0101', title: 'Acreditación EMA SA-0101-004/12',
      issuing_body: 'EMA', cert_type: 'Acreditación',
      excerpt: 'Acreditación en sistemas de gestión de calidad para laboratorios de ensayo.',
      cover_image_url: 'assets/img/blog/ca-blog-1.3.png', certificate_file_url: null,
      is_active: true, issued_at: null, expires_at: null
    },
    {
      id: 3, slug: 'laboratorio-constatacion-sader', title: 'Laboratorio de Constatación SADER',
      issuing_body: 'SADER', cert_type: 'Aprobación',
      excerpt: 'Aprobados como Laboratorio de Constatación y Control Interno por SADER.',
      cover_image_url: 'assets/img/blog/ca-blog-1.1.png', certificate_file_url: null,
      is_active: true, issued_at: null, expires_at: null
    }
  ];

  private usingFallback = false;

  constructor(private certService: CertificationsService) {}

  private readonly minItems = 3;

  ngOnInit(): void {
    // Prioriza las destacadas y completa con el resto hasta tener al menos 3
    forkJoin({
      featured: this.certService.getCertifications({ limit: this.minItems, destacadas: true }).pipe(catchError(() => of([]))),
      all: this.certService.getCertifications({ limit: this.minItems * 2 }).pipe(catchError(() => of([])))
    }).subscribe(({ featured, all }) => {
      const merged = [...(featured ?? [])];
      for (const cert of all ?? []) {
        if (merged.length >= this.minItems) break;
        if (!merged.some(c => c.id === cert.id)) merged.push(cert);
      }
      this.usingFallback = !merged.length;
      this.certifications = merged.length ? merged : this.fallback;
      this.isLoading = false;
    });
  }

  coverImageUrl(cert: CertificationCard): string {
    if (this.usingFallback) return cert.cover_image_url || 'assets/img/blog/ca-blog-1.1.png';
    return resolveAssetUrl(cert.cover_image_url) || 'assets/img/blog/ca-blog-1.1.png';
  }
}
