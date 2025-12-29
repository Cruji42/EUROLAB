import { Component } from '@angular/core';
import { services } from '../../../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-service-right',
  imports: [CommonModule,RouterLink],
  templateUrl: './more-service-right.component.html',
  styles: ``
})
export class MoreServiceRightComponent {
  services = services
}
