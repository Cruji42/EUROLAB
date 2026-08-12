import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [BreadcrumbComponent, TranslatePipe],
  templateUrl: './contact.component.html',
  styles: [`
  .ca-contact-inner .row {
    display: flex;
    flex-wrap: wrap;
  }

  .ca-contact-inner .row > [class*="col-"] {
    display: flex;
  }

  .ca-location-3 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .ca-location-icbox {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  .ca-location-icbox-img {
    flex-shrink: 0;
  }

  .ca-location-icbox-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
`]
})
export class ContactComponent {

}
