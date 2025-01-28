import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'monitor'
  },
  {
    path: 'monitor',
    loadComponent: () => import('./dashboard/dashboard.component')
  }
];
