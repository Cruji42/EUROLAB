import { Component } from '@angular/core';

@Component({
  selector: 'app-blog1',
  imports: [],
  templateUrl: './blog1.component.html',
  styles: ``
})
export class Blog1Component {
  blogs = [
    { image: 'assets/img/blog/ca-blog-1.2.png', date: 'March 21, 2024', author: 'Henry Nicolls', category: 'Transport & Logistics', title: 'Optimizing Last-Mile Delivery: Strategies for Success', description: 'Delve into the challenges of last-mile delivery and explore strategies to overcome them.', link: 'blog-single.html', animation: 'fade-right', duration: 800 },
    { image: 'assets/img/blog/ca-blog-1.3.png', date: 'March 20, 2024', author: 'Henry Nicolls', category: 'Transport & Logistics', title: 'Handling Project Cargo: Expert Tips and Strategies', description: 'Get expert tips on managing project cargo logistics. From planning and coordination.', link: 'blog-single.html', animation: 'fade-up', duration: 1000 },
    { image: 'assets/img/blog/ca-blog-1.1.png', date: 'March 18, 2024', author: 'Henry Nicolls', category: 'Transport & Logistics', title: 'The Importance of Reliable Freight Forwarding Services', description: 'Learn practical strategies for optimizing your supply chain operations, improve delivery.', link: 'blog-single.html', animation: 'fade-left', duration: 1200 }
  ];
}
