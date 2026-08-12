import { Component } from '@angular/core';
import { CounterDirective } from '../../../../directives/counter.directive';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-values',
  imports: [CounterDirective, RouterLink, TranslatePipe],
  templateUrl: './about-values.component.html',
  styles: `
  .ca-value-cards-row {
    display: flex;
    flex-wrap: wrap;
  }

  .ca-value-cards-row > [class*="col-"] {
    display: flex;
  }

  .ca-value-cbox {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .ca-value-cbox ul {
    flex: 1;
  }

  .ca-value-cbox .ca-counter-title {
    text-align: center;
  }

  .ca-value-cbox-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 16px auto;
  }

  .ca-value-cbox-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
})
export class AboutValuesComponent {

}
