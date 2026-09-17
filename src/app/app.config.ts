import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { langInterceptor } from './core/interceptors/lang.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './core/services/auth.service';

// Bandera a nivel de módulo, compartida entre todas las invocaciones del
// interceptor funcional, para no disparar logout() más de una vez por ráfaga.
let isRedirectingToLogin = false;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const authService = inject(AuthService);
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

              if (error.status === 401 && !isRedirectingToLogin) {
                isRedirectingToLogin = true;

                // Usar authService.logout() en vez de tocar localStorage
                // directamente: esto limpia el token, emite null en
                // currentUser$ (para que AdminGuard y LoginComponent lo
                // vean actualizado) y navega a /login.
                authService.logout();

                setTimeout(() => {
                  isRedirectingToLogin = false;
                }, 1000);
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