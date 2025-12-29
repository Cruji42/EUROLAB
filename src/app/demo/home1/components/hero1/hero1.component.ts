import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-hero1',
  imports: [SlickCarouselModule,RouterLink],
  templateUrl: './hero1.component.html',
  styles: ``
})
export class Hero1Component {
sliderConfig={  arrows: false,
  dots: true,
  centerPadding: '0px',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow:'<span class="prev_arrow1"><i class="fa-regular fa-arrow-right"></i></span>',
  nextArrow:'<span class="next_arrow1"><i class="fa-regular fa-arrow-left"></i></span>',
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    }
  ]}
}
