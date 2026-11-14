import { Routes } from '@angular/router';

// Every page is lazy loaded - check the "Lazy chunk files" in the build output.
export const routes: Routes = [
  { path: '', redirectTo: 'pipes', pathMatch: 'full' },
  { path: 'pipes', loadComponent: () => import('./pipes/pipes-demo'), title: 'Pipes' },
  { path: 'interceptors', loadComponent: () => import('./posts/posts'), title: 'Interceptors' },
  { path: 'subjects', loadComponent: () => import('./subjects/subjects-demo'), title: 'Subjects' },
  { path: '**', redirectTo: 'pipes' },
];
