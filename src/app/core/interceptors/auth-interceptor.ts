import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthApi } from '@auth/services';
import { dispatch, select } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthActions } from '@st/auth/auth.actions';
import { AuthStore } from '@st/auth/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = select(AuthStore.token)();
  const updateToken = dispatch(AuthActions.UpdateToken);
  const authApi = inject(AuthApi);

  const reqToSend = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
    : req.clone({ withCredentials: true });

  return next(reqToSend).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse && response.headers.has('x-new-access-token')) {
          const newToken = response.headers.get('x-new-access-token');
          if (newToken) updateToken(newToken);
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse && err.status === HttpStatusCode.Unauthorized) {
          try {
            authApi.logout();
          } catch {}
        }
      },
    }),
  );
};
