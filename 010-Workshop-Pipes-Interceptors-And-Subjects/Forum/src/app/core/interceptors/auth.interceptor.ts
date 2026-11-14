import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

// The API keeps the JWT in an httpOnly cookie: send it with every API request
// (withCredentials matters when the API runs on another origin) and react to expired sessions.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const userService = inject(UserService);
  const router = inject(Router);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && userService.isLoggedIn()) {
        userService.clear();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    }),
  );
};
