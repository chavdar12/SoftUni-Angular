import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./themes-page/themes-page'), title: 'Themes' },
  { path: ':themeId', loadComponent: () => import('./theme-detail/theme-detail'), title: 'Theme' },
] satisfies Routes;
