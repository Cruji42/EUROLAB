import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { menu } from '../../layout/components/navbar/data';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './nav-link.component.html',
  styles: ``
})
export class NavLinkComponent {
  menu = menu
}
