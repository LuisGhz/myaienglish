import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { select } from '@ngxs/store';
import { AuthStore } from '../../store/auth/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = select(AuthStore.isAuthenticated);
  if (!isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return isAuthenticated();
};

export const authChildGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const isAuthenticated = select(AuthStore.isAuthenticated);
  if (!isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }
  return isAuthenticated();
};
