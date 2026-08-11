import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about1',
  imports: [CommonModule, RouterLink, TranslatePipe],
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
      label: 'home.about1.items.bromatological'
    },
    {
      id: 2,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-1',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'home.about1.items.mycotoxins'
    },
    {
      id: 3,
      image: 'assets/img/about/ca-sm-about-3.2.png',
      imageClass: 'sm-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'home.about1.items.microbiology'
    },
    {
      id: 4,
      image: 'assets/img/about/ca-about-3.3.png',
      imageClass: 'lar-img-2',
      icon: 'assets/img/icon/ca-delivery3.1.svg',
      count: 11,
      label: 'home.about1.items.nirs'
    }
  ];
}
