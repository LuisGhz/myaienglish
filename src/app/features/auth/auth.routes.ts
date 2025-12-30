import { Routes } from '@angular/router';
import { alreadyAuthGuard } from '@core/guards/already-auth-guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
    canActivate: [alreadyAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-page/register-page').then((m) => m.RegisterPage),
    canActivate: [alreadyAuthGuard],
  },
];
