import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

// Only logged-in users may continue - everyone else is sent to the login page.
export const authGuard: CanActivateFn = () =>
  inject(UserService).isLoggedIn() || inject(Router).createUrlTree(['/login']);

// Only guests may continue (login / register) - logged-in users are sent home.
export const guestGuard: CanActivateFn = () =>
  !inject(UserService).isLoggedIn() || inject(Router).createUrlTree(['/home']);

// `/logout` is a route in the workshop - log out and redirect home.
export const logoutGuard: CanActivateFn = () => {
  inject(UserService).logout();
  return inject(Router).createUrlTree(['/home']);
};
