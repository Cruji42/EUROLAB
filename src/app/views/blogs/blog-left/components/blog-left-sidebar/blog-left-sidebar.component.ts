import { Component } from '@angular/core';
import { blogCategoryItems, serviceItems } from '../../../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-left-sidebar',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog-left-sidebar.component.html',
  styles: ``
})
export class BlogLeftSidebarComponent {
"blogs": [
    {
      "title": "Supply Chain Management",
      "link": "#"
    },
    {
      "title": "Domestic Freight Transport",
      "link": "#"
    },
    {
      "title": "Heavy Lift and Project Cargo",
      "link": "#"
    },
    {
      "title": "Inventory Optimization",
      "link": "#"
    },
    {
      "title": "E-commerce Fulfillment",
      "link": "#"
    }
  ]

  serviceItems = serviceItems;
  blogCategoryItems = blogCategoryItems;
}
