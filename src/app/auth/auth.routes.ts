import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, data: { noindex: true } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { noindex: true } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { noindex: true } }
];
