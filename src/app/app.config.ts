import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { provideServiceWorker } from '@angular/service-worker';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { AuthStore } from './store/auth/auth.store';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMarkdown({
      loader: HttpClient,
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          darkMode: true,
          look: 'handDrawn',
        },
      },
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideStore(
      [AuthStore],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsStoragePlugin({
        keys: ['auth'],
      })
    ),
  ],
};
