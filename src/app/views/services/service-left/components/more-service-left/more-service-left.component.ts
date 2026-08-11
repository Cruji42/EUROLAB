import { Component } from '@angular/core';
import { services } from '../../../data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-more-service-left',
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './more-service-left.component.html',
  styles: ``
})
export class MoreServiceLeftComponent {
  services = services
}
