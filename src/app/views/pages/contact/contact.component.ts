import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [BreadcrumbComponent, TranslatePipe],
  templateUrl: './contact.component.html',
  styles: ``
})
export class ContactComponent {

}
