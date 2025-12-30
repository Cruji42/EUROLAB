import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about1',
  imports: [CommonModule],
  templateUrl: './about1.component.html',
  styles: ``
})
export class About1Component {
  aboutItems = [
    {
      id: 1,
      image: 'assets/img/about/ca-about3.1.png',
      imageClass: 'lar-img-1',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Análisis Realizados'
    },
    {
      id: 2,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-1',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Análisis Realizados'
    },
    {
      id: 3,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Análisis Realizados'
    },
    {
      id: 4,
      image: 'assets/img/about/ca-about-3.3.png',
      imageClass: 'lar-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Análisis Realizados'
    }
  ];
}
