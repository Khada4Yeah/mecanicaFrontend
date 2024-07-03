import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '../core/services/modal.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(CHECK_TOKEN)) {
    return next(req);
  }

  const token = inject(TokenService);
  const router = inject(Router);
  const modal = inject(ModalService);

  const accesToken = token.getToken();
  if (accesToken) {
    const autRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accesToken}`)
    });
    return next(autRequest);
  }
  return next(req);
};
