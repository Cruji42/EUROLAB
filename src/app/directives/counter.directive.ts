import { Directive, ElementRef, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CountUp } from 'countup.js';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements OnInit {
  @Input() countTo: number = 0; 
  @Input() duration: number = 2;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (!this.isBrowser) {
      // En el HTML prerenderizado se deja la cifra final (la ven los buscadores)
      this.el.nativeElement.textContent = String(this.countTo);
      return;
    }

    const countUp = new CountUp(this.el.nativeElement, this.countTo, {
      duration: this.duration
    });

    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }
}
