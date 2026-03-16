import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminServicesService } from '../services/admin-services.service';
import { ServiceDetail } from '../../models/service.model';

@Component({
  selector: 'app-service-delete-modal',
  templateUrl: './service-delete-modal.component.html',
  styleUrls: ['./service-delete-modal.component.scss']
})
export class ServiceDeleteModalComponent {
  @Input() service!: ServiceDetail;
  deleting = false;
  error = '';
  
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
        this.error = `Error al eliminar el servicio: ${error.message}`;
        console.error('Error deleting service', error);
      }
    });
  }
  
  dismiss(): void {
    this.activeModal.dismiss();
  }
}
