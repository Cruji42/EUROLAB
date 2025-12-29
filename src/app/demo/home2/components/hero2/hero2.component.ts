import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-hero2',
  imports: [SlickCarouselModule],
  templateUrl: './hero2.component.html',
  styles: ``
})
export class Hero2Component {
  // Home 2 slider 

  sliderFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    autoplay: true,
    speed: 3000,
  }
  sliderNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    verticalSwiping: true,
    autoplay: true,
    speed: 3000,
  }
}
