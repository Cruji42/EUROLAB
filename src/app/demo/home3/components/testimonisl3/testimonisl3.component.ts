import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-testimonisl3',
  imports: [SlickCarouselModule],
  templateUrl: './testimonisl3.component.html',
  styles: ``
})
export class Testimonisl3Component {
  sliderMain = {
    slidesToShow: 1,
    arrows: false,
    asNavFor: '.sm-slider-nav',
    vertical: true,
    autoplay: true,
    verticalSwiping: true,
    dots: false
  }
  sliderMenu = {
    slidesToShow: 3,
    asNavFor: '.slider-main',
    vertical: true,
    focusOnSelect: true,
    autoplay: true,
    arrows: false
  }
}
