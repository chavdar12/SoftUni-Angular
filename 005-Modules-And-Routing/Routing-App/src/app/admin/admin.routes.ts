import { Routes } from '@angular/router';

// Lazy loaded "feature" - the standalone replacement for a lazy loaded NgModule.
export default [{ path: '', loadComponent: () => import('./admin') }] satisfies Routes;
