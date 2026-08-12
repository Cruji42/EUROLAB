import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminServicesService, ServiceAdmin } from '../services/admin-services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceDeleteModalComponent } from './service-delete-modal.component';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  services: ServiceAdmin[] = [];
  filteredServices: ServiceAdmin[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private servicesService: AdminServicesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.servicesService.getAllServices().subscribe({
      next: (services) => {
        this.services = services;
        this.filteredServices = services;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services', error);
        this.loading = false;
      }
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredServices = this.services;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredServices = this.services.filter(service =>
      this.name(service).toLowerCase().includes(term)
    );
  }

  openDeleteModal(service: ServiceAdmin): void {
    const modalRef = this.modalService.open(ServiceDeleteModalComponent);
    modalRef.componentInstance.service = service;

    modalRef.result.then(
      (result) => {
        if (result === 'deleted') {
          this.loadServices();
        }
      },
      () => {} // Dismissed
    );
  }

  name(service: ServiceAdmin): string {
    return service.translations.es.name || service.translations.en.name || '';
  }
}
