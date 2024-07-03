import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { inject } from '@angular/core';

import { ModalService } from '../core/services/modal.service';




export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const modal = inject(ModalService);

  const isValidToken = tokenService.isTokenValid();

  if (!isValidToken) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
