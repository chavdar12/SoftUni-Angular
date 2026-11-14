import { Routes } from '@angular/router';
import { authGuard, logoutGuard } from './core/guards/auth.guard';
import { NotFound } from './core/not-found/not-found';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'SoftUni Forum' },
  // Lazy loaded features - each one is downloaded in its own chunk.
  { path: 'themes', loadChildren: () => import('./themes/themes.routes') },
  {
    path: 'add-theme',
    loadComponent: () => import('./themes/new-theme/new-theme'),
    canActivate: [authGuard],
    title: 'New Theme',
  },
  { path: '', loadChildren: () => import('./user/user.routes') },
  { path: 'logout', canActivate: [logoutGuard], children: [] },
  { path: '**', component: NotFound, title: 'Page Not Found' },
];
