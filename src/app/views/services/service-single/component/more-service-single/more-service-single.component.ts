import { Component } from '@angular/core';
import { services } from '../../../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-service-single',
  imports: [CommonModule,RouterLink],
  templateUrl: './more-service-single.component.html',
  styles: ``
})
export class MoreServiceSingleComponent {
  services = services
}
