import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { select } from '@ngxs/store';
import { AuthStore } from '@st/auth/auth.store';

export const alreadyAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = select(AuthStore.isAuthenticated);

  if (isAuth()) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
