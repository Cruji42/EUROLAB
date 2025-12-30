import { Component } from '@angular/core';
import { faqs } from '../../../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-service-sidebar',
  imports: [NgbAccordionModule],
  templateUrl: './single-service-sidebar.component.html',
  styles: ``
})
export class SingleServiceSidebarComponent {
  faqs = faqs;
  services = [
    "Cambio",
    "Domestic Freight Transport",
    "Heavy Lift and Project Cargo",
    "Inventory Optimization",
    "E-commerce Fulfillment"
  ];
  serviceItems = [
    "Detalle del Servicio",
    "Nuestros Servicios Especializados",
    "Destacados del Servicio",
    "Nuestros Servicios en Detalle",
    "Que ofrecemos",
    "Servicio de Calidad"
  ];
}
