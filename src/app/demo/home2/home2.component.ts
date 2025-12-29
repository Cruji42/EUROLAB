import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from "../../layout/components/navbar/navbar.component";
import { Hero2Component } from "./components/hero2/hero2.component";
import { About2Component } from "./components/about2/about2.component";
import { Service2Component } from "./components/service2/service2.component";
import { Portfolio2Component } from "./components/portfolio2/portfolio2.component";
import { Testimonial2Component } from "./components/testimonial2/testimonial2.component";
import { Faq2Component } from "./components/faq2/faq2.component";
import { Contact2Component } from "./components/contact2/contact2.component";
import { Blog2Component } from "./components/blog2/blog2.component";
import { Cta2Component } from "./components/cta2/cta2.component";
import { Footer2Component } from "./components/footer2/footer2.component";
import * as AOS from 'aos';

@Component({
  selector: 'app-home2',
  imports: [NavbarComponent, Hero2Component, About2Component, Service2Component, Portfolio2Component, Testimonial2Component, Faq2Component, Contact2Component, Blog2Component, Cta2Component, Footer2Component],
  templateUrl: './home2.component.html',
  styles: ``
})
export class Home2Component {
  constructor(public el :ElementRef){}

  ngOnInit() {
    AOS.init();
  }
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

    const progressWrap = this.el.nativeElement.querySelector('#topBtn2');
    if (window.scrollY > this.offset) {
      progressWrap.classList.add('d-inline-block');
    } else {
      progressWrap.classList.remove('d-inline-block');
    }
  }

  
  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
