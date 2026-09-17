import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Bandera a nivel de módulo: se comparte entre todas las invocaciones del
// interceptor funcional (todas corren en el mismo contexto de la app),
// así que sirve igual que un campo de instancia en un interceptor de clase.
let isRedirectingToLogin = false;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const router = inject(Router);
          // Get the token from localStorage
          const token = localStorage.getItem('auth_token');

          // Log the request for debugging
          console.log('Making request to:', req.url);

          // If token exists, add it to the Authorization header
          if (token) {
            console.log('Adding token to request:', token.substring(0, 10) + '...');
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          } else {
            console.log('No token found in localStorage');
          }

          // Add withCredentials to allow cookies to be sent
          req = req.clone({
            withCredentials: true
          });

          return next(req).pipe(
            catchError((error) => {
              console.error('HTTP Error:', error);

              if (error.status === 401) {
                // Evita que cientos de peticiones fallando casi al mismo
                // tiempo disparen removeItem + navigate una y otra vez,
                // que es lo que produce el parpadeo del menú y bloquea
                // la navegación hasta hacer reload.
                console.warn('Unauthorized request detected. Redirecting to login...');
                if (!isRedirectingToLogin) {
                  isRedirectingToLogin = true;

                  // Token expired or invalid
                  localStorage.removeItem('auth_token');
                  // Redirect to login page
                  console.log('Redirecting to /login');
                  router.navigateByUrl('/login');

                  // Se resetea tras un momento para permitir un futuro
                  // logout legítimo (ej. una nueva sesión que también expire).
                  setTimeout(() => {
                    isRedirectingToLogin = false;
                  }, 1000);
                }
              }
              return throwError(() => error);
            })
          );
        },
        langInterceptor
      ])
    ),
    BrowserAnimationsModule,
    BrowserModule,
    provideAnimations(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
      fallbackLang: 'es',
      lang: 'es'
    })
  ]
};