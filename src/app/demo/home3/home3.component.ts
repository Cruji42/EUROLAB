import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from "../../layout/components/navbar/navbar.component";
import { Hero3Component } from "./components/hero3/hero3.component";
import { About3Component } from "./components/about3/about3.component";
import { Service3Component } from "./components/service3/service3.component";
import { Portfolio3Component } from "./components/portfolio3/portfolio3.component";
import { Testimonisl3Component } from "./components/testimonisl3/testimonisl3.component";
import { TeamArea3Component } from "./components/team-area3/team-area3.component";
import { Contact3Component } from "./components/contact3/contact3.component";
import { Blog3Component } from "./components/blog3/blog3.component";
import { Footer3Component } from "./components/footer3/footer3.component";

@Component({
  selector: 'app-home3',
  imports: [NavbarComponent, Hero3Component, About3Component, Service3Component, Portfolio3Component, Testimonisl3Component, TeamArea3Component, Contact3Component, Blog3Component, Footer3Component],
  templateUrl: './home3.component.html',
  styles: ``
})
export class Home3Component {
  constructor(public el :ElementRef){}

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

    const progressWrap = this.el.nativeElement.querySelector('#topBtn');
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
