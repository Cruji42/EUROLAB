import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { faqs } from '../../../data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-right-service-sidebar',
  imports: [NgbAccordionModule, TranslatePipe],
  templateUrl: './right-service-sidebar.component.html',
  styles: ``
})
export class RightServiceSidebarComponent {
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
    "Our services in Detail",
    "What We Provide",
    "Extensive Service"
  ];
}
