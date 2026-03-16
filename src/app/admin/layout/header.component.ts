import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  
  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.sub.split('@')[0] : 'Usuario';
  }
}
