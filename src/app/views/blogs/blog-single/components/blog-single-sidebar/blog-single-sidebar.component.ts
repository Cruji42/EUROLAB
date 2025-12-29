import { Component } from '@angular/core';
import { blogCategoryItems, serviceItems } from '../../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-single-sidebar',
  imports: [CommonModule],
  templateUrl: './blog-single-sidebar.component.html',
  styles: ``
})
export class BlogSingleSidebarComponent {
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
