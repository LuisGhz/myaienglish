import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { dispatch, select } from '@ngxs/store';
import { AuthActions } from '@st/auth/auth.actions';
import { AuthStore } from '@st/auth/auth.store';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = select(AuthStore.token)();
  const updateToken = dispatch(AuthActions.UpdateToken);

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return next(clonedReq);
  }

  return next(
    req.clone({
      withCredentials: true,
    }),
  ).pipe(
    tap((response) => {
      if (response instanceof HttpResponse && response.headers.has('x-new-access-token')) {
        const newToken = response.headers.get('x-new-access-token');
        if (newToken) updateToken(newToken);
      }
    }),
  );
};
