import { HttpInterceptorFn } from '@angular/common/http';
import { select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = select(AuthStore.token)();

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
