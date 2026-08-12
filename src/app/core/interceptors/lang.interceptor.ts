import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const langInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) return next(req);
  if (req.url.includes('/admin/')) return next(req);
  if (req.params.has('lang')) return next(req);

  const lang = localStorage.getItem('lang') ?? 'es';
  const cloned = req.clone({ params: req.params.set('lang', lang) });
  return next(cloned);
};
