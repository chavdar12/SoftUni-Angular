import { Routes } from '@angular/router';
import { authGuard, guestGuard, logoutGuard } from './core/guards/auth.guard';
import { NotFound } from './core/not-found/not-found';
import { Home } from './home/home';
import { NewTheme } from './themes/new-theme/new-theme';
import { ThemeDetail } from './themes/theme-detail/theme-detail';
import { ThemesPage } from './themes/themes-page/themes-page';
import { Login } from './user/login/login';
import { Profile } from './user/profile/profile';
import { Register } from './user/register/register';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'SoftUni Forum' },
  { path: 'themes', component: ThemesPage, title: 'Themes' },
  { path: 'themes/:themeId', component: ThemeDetail, title: 'Theme' },
  { path: 'add-theme', component: NewTheme, canActivate: [authGuard], title: 'New Theme' },
  { path: 'profile', component: Profile, canActivate: [authGuard], title: 'Profile' },
  { path: 'login', component: Login, canActivate: [guestGuard], title: 'Login' },
  { path: 'register', component: Register, canActivate: [guestGuard], title: 'Register' },
  { path: 'logout', canActivate: [logoutGuard], children: [] },
  { path: '**', component: NotFound, title: 'Page Not Found' },
];
