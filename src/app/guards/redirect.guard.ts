import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { inject } from '@angular/core';

export const redirectGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();

  if (token) {
    router.navigate(['/admin']);
    return false;
  }

  return true;
};
