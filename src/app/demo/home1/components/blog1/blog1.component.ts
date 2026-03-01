import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog1',
  imports: [RouterLink],
  templateUrl: './blog1.component.html',
  styles: ``
})
export class Blog1Component {
  blogs = [
    { image: 'assets/img/blog/ca-blog-1.2.png', date: 'Acreditación', author: 'EMA', category: 'Laboratorio de Ensayo', title: 'Acreditación EMA A-0667-063/15', description: 'Acreditación de la Entidad Mexicana de Acreditación para ensayos clínicos y análisis de laboratorio.', link: 'about', animation: 'fade-right', duration: 800 },
    { image: 'assets/img/blog/ca-blog-1.3.png', date: 'Acreditación', author: 'EMA', category: 'SA', title: 'Acreditación EMA SA-0101-004/12', description: 'Acreditación en sistemas de gestión de calidad para laboratorios de ensayo.', link: 'about', animation: 'fade-up', duration: 1000 },
    { image: 'assets/img/blog/ca-blog-1.1.png', date: 'Aprobación', author: 'SADER', category: 'Laboratorio', title: 'Laboratorio de Constatación SADER', description: 'Aprobados como Laboratorio de Constatación y Control Interno por SADER.', link: 'about', animation: 'fade-left', duration: 1200 }
  ];
}
