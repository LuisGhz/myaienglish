import { Routes } from '@angular/router';
import { authChildGuard, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    loadChildren: () =>
      import('./features/translation/translation.routes').then((m) => m.TRANSLATION_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
