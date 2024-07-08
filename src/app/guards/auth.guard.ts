import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { inject } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';




export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const modal = inject(NzModalService);

  const isValidToken = tokenService.isTokenValid();

  if (!isValidToken) {
    modal.info({
      nzTitle: 'Sesión Expirada',
      nzContent: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      nzOnOk: () => {
        router.navigate(['/login']);
      }
    });

    return false;
  }

  return true;
};
