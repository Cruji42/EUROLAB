import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { testimonial } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial',
  imports: [BreadcrumbComponent,CommonModule],
  templateUrl: './testimonial.component.html',
  styles: ``
})
export class TestimonialComponent {
  testimonial = testimonial
}
