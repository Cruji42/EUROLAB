import { Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
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

    const progressWrap = this.el.nativeElement.querySelector('#topBtn3');
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
