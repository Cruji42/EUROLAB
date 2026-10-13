import { formatDate } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LOCALES: Record<string, string> = {
  es: 'es-MX',
  en: 'en-US',
};

/**
 * Same as Angular's `date` pipe, but formats with the language selected in
 * ngx-translate so month names follow the language switcher.
 * Impure so the output refreshes when the language changes.
 */
@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(value: string | number | Date | null | undefined, format = 'longDate'): string | null {
    if (value === null || value === undefined || value === '') return null;
    const locale = LOCALES[this.translate.currentLang() ?? 'es'] ?? LOCALES['es'];
    return formatDate(value, format, locale);
  }
}
