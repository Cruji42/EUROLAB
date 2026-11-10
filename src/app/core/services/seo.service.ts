import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  type?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Centraliza título, meta description, canonical, Open Graph, Twitter Card,
 * robots y el atributo lang del <html>.
 *
 * Cada ruta puede declarar en `data`:
 *  - title:       clave i18n del título
 *  - description: clave i18n de la descripción
 *  - noindex:     true para excluirla de buscadores (admin, login, demos)
 *
 * Las páginas de detalle (servicio, noticia, certificación) llaman a
 * `setPage()` cuando llegan los datos de la API.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  private readonly siteUrl = environment.siteUrl.replace(/\/+$/, '');
  private readonly defaultImage = `${this.siteUrl}/assets/img/logo/laboratorio-euronutec-light.png`;

  private titleKey: string | null = null;
  private descriptionKey: string | null = null;
  private noindex = false;

  init(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.applyRouteData());

    this.translate.onLangChange.subscribe((e) => {
      this.document.documentElement.lang = e.lang;
      this.meta.updateTag({ property: 'og:locale', content: e.lang === 'en' ? 'en_US' : 'es_MX' });
      this.applyTranslatedKeys();
    });
  }

  /** Metadatos dinámicos para páginas cuyo contenido viene de la API. */
  setPage(data: SeoData): void {
    // El contenido dinámico manda: evita que un cambio de idioma lo pise
    // con el título/descripción genéricos de la ruta.
    if (data.title) {
      this.titleKey = null;
      this.setTitle(`${data.title} | Laboratorio EURONUTEC`);
    }
    if (data.description) {
      this.descriptionKey = null;
      this.setDescription(data.description);
    }
    this.setImage(data.image || this.defaultImage);
    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    if (data.noindex !== undefined) {
      this.setRobots(data.noindex);
    }
  }

  private applyRouteData(): void {
    let r = this.route;
    let noindex = !!r.snapshot.data['noindex'];
    while (r.firstChild) {
      r = r.firstChild;
      // noindex se hereda: si cualquier ruta padre lo declara (ej. /admin), aplica a sus hijas.
      noindex = noindex || !!r.snapshot.data['noindex'];
    }
    const data = r.snapshot.data;

    this.titleKey = data['title'] ?? null;
    this.descriptionKey = data['description'] ?? 'routes.descriptions.default';
    this.noindex = noindex;

    this.setRobots(this.noindex);
    this.setCanonical();
    this.setImage(this.defaultImage);
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.applyTranslatedKeys();
  }

  private applyTranslatedKeys(): void {
    if (this.titleKey) {
      this.translate.get(this.titleKey).subscribe((t: string) => this.setTitle(t));
    }
    if (this.descriptionKey) {
      this.translate.get(this.descriptionKey).subscribe((d: string) => this.setDescription(d));
    }
  }

  private setTitle(value: string): void {
    this.title.setTitle(value);
    this.meta.updateTag({ property: 'og:title', content: value });
    this.meta.updateTag({ name: 'twitter:title', content: value });
  }

  private setDescription(value: string): void {
    const clean = value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
    this.meta.updateTag({ name: 'description', content: clean });
    this.meta.updateTag({ property: 'og:description', content: clean });
    this.meta.updateTag({ name: 'twitter:description', content: clean });
  }

  private setImage(url: string): void {
    this.meta.updateTag({ property: 'og:image', content: url });
    this.meta.updateTag({ name: 'twitter:image', content: url });
  }

  private setRobots(noindex: boolean): void {
    this.meta.updateTag({
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });
  }

  private setCanonical(): void {
    const path = this.router.url.split(/[?#]/)[0];
    // "/" y "/index" son la misma página: se unifican en la raíz.
    const canonicalPath = path === '/index' ? '/' : path;
    const url = `${this.siteUrl}${canonicalPath}`;

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
