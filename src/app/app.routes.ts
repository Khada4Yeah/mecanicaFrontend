import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { redirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  { path: '', canActivate: [redirectGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];
