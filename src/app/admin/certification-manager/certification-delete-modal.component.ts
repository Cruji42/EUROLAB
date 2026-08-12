import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminCertificationsService, CertificationAdmin } from '../services/admin-certifications.service';

@Component({
  selector: 'app-certification-delete-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './certification-delete-modal.component.html'
})
export class CertificationDeleteModalComponent {
  @Input() certification!: CertificationAdmin;
  deleting = false;
  error = '';
  private translate = inject(TranslateService);

  constructor(
    public activeModal: NgbActiveModal,
    private certService: AdminCertificationsService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';
    this.certService.deleteCertification(this.certification.id).subscribe({
      next: () => { this.deleting = false; this.activeModal.close('deleted'); },
      error: (err) => { this.deleting = false; this.error = this.translate.instant('admin.certifications.errors.deleteFailed', { message: err.message }); }
    });
  }

  dismiss(): void { this.activeModal.dismiss(); }
}
