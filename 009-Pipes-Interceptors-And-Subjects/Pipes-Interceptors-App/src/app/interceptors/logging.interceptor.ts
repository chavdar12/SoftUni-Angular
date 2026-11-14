import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { RequestLog } from './request-log';

// Logs every request, how long it took, and handles errors in one place.
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const log = inject(RequestLog);
  const started = performance.now();

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      log.add(`ERROR ${err.status} ${req.method} ${req.url}`);
      return throwError(() => err);
    }),
    finalize(() =>
      log.add(
        `${req.method} ${req.url} (${Math.round(performance.now() - started)} ms, ` +
          `Authorization: ${req.headers.has('Authorization') ? 'yes' : 'no'})`,
      ),
    ),
  );
};
