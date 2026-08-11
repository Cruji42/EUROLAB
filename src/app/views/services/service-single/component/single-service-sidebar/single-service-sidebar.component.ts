import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faqs } from '../../../data';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceDetail } from '../../../../../models/service.model';

@Component({
  selector: 'app-single-service-sidebar',
  imports: [CommonModule, NgbAccordionModule, TranslatePipe],
  templateUrl: './single-service-sidebar.component.html',
  styles: ``
})
export class SingleServiceSidebarComponent {
  @Input() service: ServiceDetail | null = null;
  faqs = faqs;
  serviceItems = [
    "views.serviceSingle.items.detail",
    "views.serviceSingle.items.specialized",
    "views.serviceSingle.items.highlights",
    "views.serviceSingle.items.detailed",
    "views.serviceSingle.items.whatWeOffer",
    "views.serviceSingle.items.qualityService"
  ];
}
