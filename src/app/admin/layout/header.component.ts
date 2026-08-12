import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { LanguageSwitcherComponent } from '../../layout/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private translate = inject(TranslateService);

  constructor(public authService: AuthService) {}

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.sub.split('@')[0] : this.translate.instant('admin.layout.defaultUser');
  }
}
