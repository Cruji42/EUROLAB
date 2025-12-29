import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CountUp } from 'countup.js';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements OnInit {
  @Input() countTo: number = 0; 
  @Input() duration: number = 2;

  constructor(private el: ElementRef) {}

  ngOnInit() {
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
