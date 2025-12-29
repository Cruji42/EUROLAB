import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-sponsor4',
  imports: [SlickCarouselModule],
  templateUrl: './sponsor4.component.html',
  styles: ``
})
export class Sponsor4Component {
brandSlider={
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  arrows: false,
  swipe: false,
  slidesToShow: 6,
  cssEase: 'linear',
  pauseOnFocus: false,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
}
barndSlider2={
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  arrows: false,
  swipe: false,
  slidesToShow: 6,
  cssEase: 'linear',
  pauseOnFocus: false,
  pauseOnHover: false,
  rtl: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
}
}
