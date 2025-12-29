import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio1',
  imports: [],
  templateUrl: './portfolio1.component.html',
  styles: ``
})
export class Portfolio1Component {
  projects = [
    { image: 'assets/img/portfolio/ca-portfoli3.1.png', category: 'Laboratorio', title: 'Lorem ipsum dolor sit amet', link: 'project-single.html', icon: 'assets/img/icon/ca-arow-3.1.svg', colClass: 'col-lg-3 col-md-6' },
    { image: 'assets/img/portfolio/ca-portfolio3.2.png', category: 'Laboratorio', title: 'Lorem ipsum dolor sit amet', link: 'project-single.html', icon: 'assets/img/icon/ca-arow-3.1.svg', colClass: 'col-lg-4 col-md-6' },
    { image: 'assets/img/portfolio/ca-portfoli3.3.png', category: 'Laboratorio', title: 'Lorem ipsum dolor sit amet', link: 'project-single.html', icon: 'assets/img/icon/ca-arow-3.1.svg', colClass: 'col-lg-5 col-md-6' },
    { image: 'assets/img/portfolio/ca-project3.4.png', category: 'Laboratorio', title: 'Lorem ipsum dolor sit amet', link: 'project-single.html', icon: 'assets/img/icon/ca-arow-3.1.svg', colClass: 'col-lg-6 col-md-6' },
    { image: 'assets/img/portfolio/ca-portfolio-3.5.png', category: 'Laboratorio', title: 'Lorem ipsum dolor sit amet', link: 'project-single.html', icon: 'assets/img/icon/ca-arow-3.1.svg', colClass: 'col-lg-6 col-md-6' }
  ];
}
