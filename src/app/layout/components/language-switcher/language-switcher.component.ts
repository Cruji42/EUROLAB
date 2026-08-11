import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

interface LangOption {
  code: 'es' | 'en';
  label: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './language-switcher.component.html',
  styles: `
    .ca-lang-switcher-toggle {
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 4px;
      padding: 4px 10px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
    }
    .ca-lang-switcher-toggle::after {
      display: none;
    }
  `
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);

  readonly langs: LangOption[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' }
  ];

  get currentLang(): string {
    return this.translate.currentLang() ?? 'es';
  }

  switchLang(code: 'es' | 'en'): void {
    this.translate.use(code);
    localStorage.setItem('lang', code);
  }
}
