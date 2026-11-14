import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { userResolver } from './core/user.resolver';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { UserDetail } from './users/user-detail/user-detail';
import { UserList } from './users/user-list/user-list';
import { UserProfile } from './users/user-profile/user-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'about', component: About, title: 'About' },
  {
    path: 'users',
    component: UserList,
    title: 'Users',
    // Nested routes render in UserList's <router-outlet>.
    children: [
      { path: ':id', component: UserDetail, resolve: { user: userResolver } },
      {
        path: ':id/profile',
        component: UserProfile,
        resolve: { user: userResolver },
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes'), canMatch: [authGuard] },
  { path: '**', component: NotFound, title: 'Not Found' },
];
