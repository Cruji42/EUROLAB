import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminCertificationsService, Certification } from '../services/admin-certifications.service';

@Component({
  selector: 'app-certification-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certification-delete-modal.component.html'
})
export class CertificationDeleteModalComponent {
  @Input() certification!: Certification;
  deleting = false;
  error = '';

  constructor(
    public activeModal: NgbActiveModal,
    private certService: AdminCertificationsService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';
    this.certService.deleteCertification(this.certification.id).subscribe({
      next: () => { this.deleting = false; this.activeModal.close('deleted'); },
      error: (err) => { this.deleting = false; this.error = `Error al eliminar: ${err.message}`; }
    });
  }

  dismiss(): void { this.activeModal.dismiss(); }
}
