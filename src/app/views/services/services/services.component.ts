import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { RouterLink } from '@angular/router';
import { services } from '../data';

@Component({
  selector: 'app-services',
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './services.component.html',
  styles: ``
})
export class ServicesComponent {
  services = services

}
