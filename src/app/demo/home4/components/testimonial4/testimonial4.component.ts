import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-testimonial4',
  imports: [SlickCarouselModule],
  templateUrl: './testimonial4.component.html',
  styles: ``
})
export class Testimonial4Component {
  testimonial = {
    arrows: false,
    dots: true,
    slidesToShow: 2,
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
