import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '../core/guards/auth.guard';

export default [
  {
    path: 'login',
    loadComponent: () => import('./login/login'),
    canActivate: [guestGuard],
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register'),
    canActivate: [guestGuard],
    title: 'Register',
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile'),
    canActivate: [authGuard],
    title: 'Profile',
  },
] satisfies Routes;
