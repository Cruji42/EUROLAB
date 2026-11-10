import { RenderMode, ServerRoute } from '@angular/ssr';
import { environment } from '../environments/environment';

/**
 * Prerender (SSG): en `ng build` se genera un HTML real por cada ruta pública
 * para que buscadores y redes sociales vean contenido, título y meta tags
 * sin ejecutar JavaScript. Las rutas de detalle obtienen sus slugs de la API
 * en el momento del build, así que tras publicar contenido nuevo desde el
 * admin hay que volver a hacer build y subirlo.
 */

async function fetchSlugs(path: string): Promise<{ slug: string }[]> {
  try {
    const res = await fetch(`${environment.apiUrl}/${path}`);
    if (!res.ok) {
      console.warn(`[prerender] ${path} respondió ${res.status}; se omiten sus páginas de detalle`);
      return [];
    }
    const items: { slug?: string }[] = await res.json();
    return items.filter(i => !!i.slug).map(i => ({ slug: i.slug as string }));
  } catch (err) {
    console.warn(`[prerender] no se pudo consultar ${path}:`, err);
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  // Zonas privadas o sin valor SEO: solo en el navegador
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'forgot-password', renderMode: RenderMode.Client },
  { path: 'reset-password', renderMode: RenderMode.Client },
  // Homes de demostración de la plantilla (noindex; usan AOS/DOM en ngOnInit)
  { path: 'index-02', renderMode: RenderMode.Client },
  { path: 'index-03', renderMode: RenderMode.Client },
  { path: 'index-04', renderMode: RenderMode.Client },

  // Detalles con contenido de la API
  {
    path: 'service-single/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => fetchSlugs('servicios?lang=es'),
  },
  {
    path: 'blog-single/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => fetchSlugs('noticias?lang=es&limit=50'),
  },
  {
    path: 'certificaciones/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => fetchSlugs('certificaciones?limit=100&lang=es'),
  },

  // Resto de páginas estáticas
  { path: '**', renderMode: RenderMode.Prerender },
];
