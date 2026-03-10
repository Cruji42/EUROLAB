import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faqs } from '../../../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDetail } from '../../../../../models/service.model';

@Component({
  selector: 'app-single-service-sidebar',
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './single-service-sidebar.component.html',
  styles: ``
})
export class SingleServiceSidebarComponent {
  @Input() service: ServiceDetail | null = null;
  faqs = faqs;
  serviceItems = [
    "Detalle del Servicio",
    "Nuestros Servicios Especializados",
    "Destacados del Servicio",
    "Nuestros Servicios en Detalle",
    "Que ofrecemos",
    "Servicio de Calidad"
  ];
}
