import { Component } from '@angular/core';
import { CounterDirective } from '../../../../directives/counter.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-values',
  imports: [CounterDirective, RouterLink],
  templateUrl: './about-values.component.html',
  styles: ``
})
export class AboutValuesComponent {

}
