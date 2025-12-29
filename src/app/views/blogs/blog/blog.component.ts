import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { blog } from '../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [BreadcrumbComponent,RouterLink],
  templateUrl: './blog.component.html',
  styles: ``
})
export class BlogComponent {
  blog = blog
}
