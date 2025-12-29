import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-testimonial1',
  imports: [SlickCarouselModule],
  templateUrl: './testimonial1.component.html',
  styles: ``
})
export class Testimonial1Component {
  testimonials = [
    { image: 'assets/img/testimonial/ca-testi3.1.png', name: 'Shevon Daniel', position: 'Co-Founder', rating: 5, title: 'Read about how our tailored solutions have helped businesses achieve.', description: 'Our clients\' satisfaction is our top priority, and their feedback speaks volumes about our dedication to excellence. We take immense pride in the positive experiences shared by businesses across various industries who rely on our transport and logistics expertise.' },
    { image: 'assets/img/testimonial/testimonial-2.1.png', name: 'Muhammad Waseem', position: 'Co-Founder', rating: 5, title: 'Hear from the businesses we support and their journey with our logistics.', description: 'At Cargon, client satisfaction is at the heart of everything we do. We are proud to share the positive experiences of our clients, whose testimonials reflect our commitment to delivering exceptional transport and logistics solutions whether it\'s seamless international.' },
    { image: 'assets/img/testimonial/ca-testi3.2.png', name: 'Shevon Daniel', position: 'Co-Founder', rating: 5, title: 'Leading businesses share their success stories and why they rely on logistics.', description: 'Whether it\'s seamless international shipping, efficient domestic transport, or specialized logistics services, our clients consistently praise our ability to meet and exceed their expectations. They highlight our innovative approach, reliable execution, & dedicated.' },
    { image: 'assets/img/testimonial/ca-testi3.2.png', name: 'Shevon Daniel', position: 'Co-Founder', rating: 5, title: 'Leading businesses share their success stories and why they rely on logistics.', description: 'Whether it\'s seamless international shipping, efficient domestic transport, or specialized logistics services, our clients consistently praise our ability to meet and exceed their expectations. They highlight our innovative approach, reliable execution, & dedicated.' }
  ];

  testimonial ={
    arrows:false,
  dots: true,
  centerPadding: '0px',
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 992,
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
