import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('@features').then(({ Home }) => Home) },
	{ path: 'auth', loadComponent: () => import('@features').then(({ Auth }) => Auth) }
];
