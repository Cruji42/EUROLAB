import { Component } from '@angular/core';
import { CounterDirective } from '../../../../directives/counter.directive';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-values',
  imports: [CounterDirective, RouterLink, TranslatePipe],
  templateUrl: './about-values.component.html',
  styles: ``
})
export class AboutValuesComponent {

}
