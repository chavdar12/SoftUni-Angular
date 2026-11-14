import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../services/user.service';

// Only logged-in users may continue - everyone else is sent to the login page.
export const authGuard: CanActivateFn = () =>
  inject(UserService).isLoggedIn() || inject(Router).createUrlTree(['/login']);

// Only guests may continue (login / register) - logged-in users are sent home.
export const guestGuard: CanActivateFn = () =>
  !inject(UserService).isLoggedIn() || inject(Router).createUrlTree(['/home']);

// `/logout` is a route in the workshop - log out via the API and redirect home.
export const logoutGuard: CanActivateFn = () => {
  const router = inject(Router);
  const notifications = inject(NotificationService);
  const home = router.createUrlTree(['/home']);

  return inject(UserService)
    .logout()
    .pipe(
      map(() => {
        notifications.showSuccess('You have been logged out.');
        return home;
      }),
      catchError(() => of(home)),
    );
};
