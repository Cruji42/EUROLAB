import { Component } from '@angular/core';
import { faqs } from '../../../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-left-service-sidebar',
  imports: [NgbAccordionModule],
  templateUrl: './left-service-sidebar.component.html',
  styles: ``
})
export class LeftServiceSidebarComponent {
  faqs = faqs;
  services = [
    "Supply Chain Management",
    "Domestic Freight Transport",
    "Heavy Lift and Project Cargo",
    "Inventory Optimization",
    "E-commerce Fulfillment"
  ];
  serviceItems = [
    "Service Breakdown",
    "Our Specialized Services",
    "Service Highlights",
    "Our Services in Detail",
    "What We Provide",
    "Extensive Service"
  ];

}
