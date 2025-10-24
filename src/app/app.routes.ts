import { Routes } from '@angular/router';

export const routes: Routes = [
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
  {
    path: '**',
    redirectTo: 'translate',
  },
];
