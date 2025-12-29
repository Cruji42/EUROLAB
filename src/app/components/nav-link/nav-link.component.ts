import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { menu } from '../../layout/components/navbar/data';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink],
  templateUrl: './nav-link.component.html',
  styles: ``
})
export class NavLinkComponent {
  menu = menu
}
