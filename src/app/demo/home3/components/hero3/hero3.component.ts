import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-hero3',
  imports: [SlickCarouselModule],
  templateUrl: './hero3.component.html',
  styles: ``
})
export class Hero3Component {
  slickConfig = {
    autoplay: true,
    draggable: true,
    arrows: false,
    dots: true,
    fade: true,
    speed: 3000,
    infinite: true,
    cssEase: 'ease',
    touchThreshold: 100,
  }
}
