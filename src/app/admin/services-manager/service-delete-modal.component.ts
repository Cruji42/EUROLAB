import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminServicesService, ServiceAdmin } from '../services/admin-services.service';

@Component({
  selector: 'app-service-delete-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './service-delete-modal.component.html',
  styleUrls: ['./service-delete-modal.component.scss']
})
export class ServiceDeleteModalComponent {
  @Input() service!: ServiceAdmin;
  deleting = false;
  error = '';
  private translate = inject(TranslateService);

  constructor(
    public activeModal: NgbActiveModal,
    private servicesService: AdminServicesService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';

    this.servicesService.deleteService(this.service.id).subscribe({
      next: () => {
        this.deleting = false;
        this.activeModal.close('deleted');
      },
      error: (error) => {
        this.deleting = false;
        this.error = this.translate.instant('admin.services.errors.deleteFailed', { message: error.message });
        console.error('Error deleting service', error);
      }
    });
  }
  
  dismiss(): void {
    this.activeModal.dismiss();
  }
}
