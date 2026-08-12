import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TranslationLang = 'es' | 'en';

@Component({
  selector: 'app-translation-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translation-tabs.component.html',
  styleUrls: ['./translation-tabs.component.scss']
})
export class TranslationTabsComponent {
  @Input() active: TranslationLang = 'es';
  @Output() activeChange = new EventEmitter<TranslationLang>();

  readonly langs: { code: TranslationLang; label: string }[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  select(lang: TranslationLang): void {
    if (lang === this.active) return;
    this.active = lang;
    this.activeChange.emit(lang);
  }
}
