import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-service2',
  imports: [SlickCarouselModule,RouterLink],
  templateUrl: './service2.component.html',
  styles: ``
})
export class Service2Component {
  serviceSlider = {
    arrows: false,
    dots: true,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]

  }
}
