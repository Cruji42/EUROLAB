import { Component } from '@angular/core';
import { services } from '../../../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-service-left',
  imports: [CommonModule,RouterLink],
  templateUrl: './more-service-left.component.html',
  styles: ``
})
export class MoreServiceLeftComponent {
  services = services
}
