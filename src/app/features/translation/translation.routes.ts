import { Routes } from '@angular/router';

export const TRANSLATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'translate',
    loadComponent: () =>
      import('./pages/translate-page/translate-page').then((m) => m.TranslatePage),
  },
  {
    path: 'instructions',
    loadComponent: () =>
      import('./pages/instructions-page/instructions-page').then((m) => m.InstructionsPage),
  },
];
