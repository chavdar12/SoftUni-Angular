import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

// Lets a request opt out of the global error notification (e.g. the startup profile check).
export const SKIP_ERROR_NOTIFICATION = new HttpContextToken<boolean>(() => false);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!req.context.get(SKIP_ERROR_NOTIFICATION)) {
        const message =
          err.status === 0
            ? 'The server is not reachable. Is the REST API running?'
            : (err.error?.message ?? err.message);
        notifications.showError(message);
      }
      return throwError(() => err);
    }),
  );
};
