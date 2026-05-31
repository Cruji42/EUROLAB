import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about1',
  imports: [CommonModule, RouterLink],
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
      label: 'Análisis bromatológico: humedad, proteína, grasa, fibra y cenizas'
    },
    {
      id: 2,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-1',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Detección de micotoxinas: aflatoxinas, zearalenona, ocratoxina y más'
    },
    {
      id: 3,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'Microbiología Tipo 2: PCR, indicadores y reto microbiano'
    },
    {
      id: 4,
      image: 'assets/img/about/ca-about-3.3.png',
      imageClass: 'lar-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'NIRS: resultados en segundos sin preparación de muestra'
    }
  ];
}
