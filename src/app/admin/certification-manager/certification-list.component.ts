import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminCertificationsService, Certification } from '../services/admin-certifications.service';
import { CertificationDeleteModalComponent } from './certification-delete-modal.component';

@Component({
  selector: 'app-certification-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss']
})
export class CertificationListComponent implements OnInit {
  certifications: Certification[] = [];
  filtered: Certification[] = [];
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
      ? this.certifications.filter(c => c.title.toLowerCase().includes(term) || c.issuing_body.toLowerCase().includes(term))
      : this.certifications;
  }

  openDeleteModal(cert: Certification): void {
    const ref = this.modalService.open(CertificationDeleteModalComponent);
    ref.componentInstance.certification = cert;
    ref.result.then(
      (result) => { if (result === 'deleted') this.load(); },
      () => {}
    );
  }

  getStatusClass(cert: Certification): string {
    return cert.is_active ? 'bg-success' : 'bg-secondary';
  }

  getStatusText(cert: Certification): string {
    return this.translate.instant(cert.is_active ? 'admin.certifications.list.active' : 'admin.certifications.list.inactive');
  }
}
