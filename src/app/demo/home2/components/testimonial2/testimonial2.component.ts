import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-testimonial2',
  imports: [SlickCarouselModule],
  templateUrl: './testimonial2.component.html',
  styles: ``
})
export class Testimonial2Component {
  testimonialConfig = {
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<span class="priv_arrow"><i class="fa-regular fa-arrow-right"></i></span>',
    nextArrow: '<span class="next_arrow"><i class="fa-regular fa-arrow-left"></i></span>',
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
