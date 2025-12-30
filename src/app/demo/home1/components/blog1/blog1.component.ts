import { Component } from '@angular/core';

@Component({
  selector: 'app-blog1',
  imports: [],
  templateUrl: './blog1.component.html',
  styles: ``
})
export class Blog1Component {
  blogs = [
    { image: 'assets/img/blog/ca-blog-1.2.png', date: 'Diciembre 21, 2025', author: 'Nombre Apellido', category: 'Categoria', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: 'blog-single.html', animation: 'fade-right', duration: 800 },
    { image: 'assets/img/blog/ca-blog-1.3.png', date: 'Diciembre 20, 2025', author: 'Nombre Apellido', category: 'Categoria', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: 'blog-single.html', animation: 'fade-up', duration: 1000 },
    { image: 'assets/img/blog/ca-blog-1.1.png', date: 'Diciembre 18, 2025', author: 'Nombre Apellido', category: 'Categoria', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: 'blog-single.html', animation: 'fade-left', duration: 1200 }
  ];
}
