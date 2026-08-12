import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminCertificationsService, CertificationAdmin } from '../services/admin-certifications.service';
import { CertificationDeleteModalComponent } from './certification-delete-modal.component';

@Component({
  selector: 'app-certification-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss']
})
export class CertificationListComponent implements OnInit {
  certifications: CertificationAdmin[] = [];
  filtered: CertificationAdmin[] = [];
  loading = true;
  searchTerm = '';
  private translate = inject(TranslateService);

  constructor(
    private certService: AdminCertificationsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.certService.getAllCertifications().subscribe({
      next: (data) => { this.certifications = data; this.filtered = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = term
      ? this.certifications.filter(c =>
          (c.translations.es.title ?? '').toLowerCase().includes(term) ||
          (c.translations.es.issuing_body ?? '').toLowerCase().includes(term))
      : this.certifications;
  }

  openDeleteModal(cert: CertificationAdmin): void {
    const ref = this.modalService.open(CertificationDeleteModalComponent);
    ref.componentInstance.certification = cert;
    ref.result.then(
      (result) => { if (result === 'deleted') this.load(); },
      () => {}
    );
  }

  getStatusClass(cert: CertificationAdmin): string {
    return cert.is_active ? 'bg-success' : 'bg-secondary';
  }

  getStatusText(cert: CertificationAdmin): string {
    return this.translate.instant(cert.is_active ? 'admin.certifications.list.active' : 'admin.certifications.list.inactive');
  }

  title(cert: CertificationAdmin): string {
    return cert.translations.es.title || cert.translations.en.title || '';
  }

  issuingBody(cert: CertificationAdmin): string {
    return cert.translations.es.issuing_body || cert.translations.en.issuing_body || '';
  }

  certType(cert: CertificationAdmin): string {
    return cert.translations.es.cert_type || cert.translations.en.cert_type || '';
  }
}
