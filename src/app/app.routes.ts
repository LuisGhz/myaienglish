import { Routes } from '@angular/router';
import { authChildGuard, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    loadChildren: () =>
      import('./features/enhance/enhance.routes').then((m) => m.ENHANCE_ROUTES),
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
