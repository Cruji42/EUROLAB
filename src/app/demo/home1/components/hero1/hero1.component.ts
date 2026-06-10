import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderService } from '../../../../services/slider.service';
import { BannerSlide } from '../../../../models/slider.model';

@Component({
  selector: 'app-hero1',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, RouterLink],
  templateUrl: './hero1.component.html',
  styles: ``
})
export class Hero1Component implements OnInit {
  slides: BannerSlide[] = [];

  sliderConfig = {
    arrows: false,
    dots: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<span class="prev_arrow1"><i class="fa-regular fa-arrow-right"></i></span>',
    nextArrow: '<span class="next_arrow1"><i class="fa-regular fa-arrow-left"></i></span>',
    responsive: [
      { breakpoint: 991, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.getActiveSlides().subscribe({
      next: (slides) => (this.slides = slides),
      error: () => (this.slides = [])
    });
  }
}
