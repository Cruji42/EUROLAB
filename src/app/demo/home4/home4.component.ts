import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from "../../layout/components/navbar/navbar.component";
import { HeroComponent } from "./components/hero/hero.component";
import { CircleTextComponent } from "./components/circle-text/circle-text.component";
import { About4Component } from "./components/about4/about4.component";
import { Service4Component } from "./components/service4/service4.component";
import { PricingPlan4Component } from "./components/pricing-plan4/pricing-plan4.component";
import { Testimonial4Component } from "./components/testimonial4/testimonial4.component";
import { Sponsor4Component } from "./components/sponsor4/sponsor4.component";
import { Contact4Component } from "./components/contact4/contact4.component";
import { BlogComponent } from "../../views/blogs/blog/blog.component";
import { Blog4Component } from "./components/blog4/blog4.component";
import { Cta4Component } from "./components/cta4/cta4.component";
import { Footer4Component } from "./components/footer4/footer4.component";

@Component({
  selector: 'app-home4',
  imports: [NavbarComponent, HeroComponent, CircleTextComponent, About4Component, Service4Component, PricingPlan4Component, Testimonial4Component, Sponsor4Component, Contact4Component, Blog4Component, Cta4Component, Footer4Component],
  templateUrl: './home4.component.html',
  styles: ``
})
export class Home4Component {
  constructor(public el: ElementRef) { }

  offset = 40;
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    const header = this.el.nativeElement.querySelector('.stiky');

    if (scrollPosition < 1) {
      header.classList.remove('scroll-header');
    } else {
      header.classList.add('scroll-header');
    }

    const progressWrap = this.el.nativeElement.querySelector('#topBtn4');
    if (window.scrollY > this.offset) {
      progressWrap.classList.add('d-inline-block');
    } else {
      progressWrap.classList.remove('d-inline-block');
    }
  }


  scrollToTop(event: Event) {
    window.requestAnimationFrame(() => {

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}