import { ApplicationConfig, EnvironmentInjector, inject, provideZoneChangeDetection, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
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
import Swal from 'sweetalert2';

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
          // No se resuelve AuthService aquí: hacerlo en cada request crea un
          // ciclo de inyección (AuthService -> Router -> ... -> interceptor
          // -> AuthService) detectado por Angular como NG0200. Se resuelve
          // de forma diferida, solo cuando realmente hace falta (401), con
          // el injector de la app.
          const envInjector = inject(EnvironmentInjector);
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

                  // Token expired or invalid: usar logout() para limpiar
                  // también el estado de currentUser$ (BehaviorSubject),
                  // no solo el localStorage, y así el guard/UI reflejen
                  // la sesión cerrada sin necesitar un reload.
                  console.log('Redirecting to /login');
                  Swal.fire({
                    icon: 'warning',
                    title: 'Sesión expirada',
                    text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
                    confirmButtonText: 'Aceptar'
                  }).then(() => {
                    runInInjectionContext(envInjector, () => inject(AuthService).logout());
                  });

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