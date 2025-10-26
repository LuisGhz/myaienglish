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
    path: 'favorites',
    loadComponent: () =>
      import('./pages/fav-translations-page/fav-translations-page').then(
        (m) => m.FavTranslationsPage
      ),
  },
  {
    path: '**',
    redirectTo: 'translate',
  },
];
