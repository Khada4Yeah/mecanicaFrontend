import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpResponse<HttpInterceptorFn>) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      return throwError(() => error);
    }),
  );
};
