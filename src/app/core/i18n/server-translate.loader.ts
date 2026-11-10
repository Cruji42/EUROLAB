import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import es from '../../../../public/assets/i18n/es.json';
import en from '../../../../public/assets/i18n/en.json';

/**
 * Loader solo para el prerender (build): en el servidor no hay quien sirva
 * /assets/i18n/*.json por HTTP, así que las traducciones se incluyen en el
 * bundle del servidor. El navegador sigue usando el loader HTTP normal.
 */
@Injectable()
export class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of((lang === 'en' ? en : es) as TranslationObject);
  }
}
