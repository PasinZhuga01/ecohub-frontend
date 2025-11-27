import { Routes } from '@angular/router';
import { createAuthGuard } from '@core/guards';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('@features').then(({ Home }) => Home), canActivate: [createAuthGuard('/projects', true)] },
	{ path: 'auth', loadComponent: () => import('@features').then(({ Auth }) => Auth) },
	{
		path: 'projects',
		loadComponent: () => import('@features/projects').then(({ Home }) => Home),
		canActivate: [createAuthGuard('/auth')]
	},
	{
		path: 'project/:id',
		loadComponent: () => import('@features/projects').then(({ Project }) => Project),
		canActivate: [createAuthGuard('/auth')]
	},
	{
		path: 'project/:id/edit',
		loadComponent: () => import('@features/projects').then(({ ProjectEdit }) => ProjectEdit),
		canActivate: [createAuthGuard('/auth')]
	},

	{
		path: 'project/:id/currencies',
		loadComponent: () => import('@features/projects').then(({ Currencies }) => Currencies),
		canActivate: [createAuthGuard('/auth')]
	},

	{
		path: 'project/:id/markets',
		loadComponent: () => import('@features/projects/markets').then(({ Home }) => Home),
		canActivate: [createAuthGuard('/auth')]
	},
	{
		path: 'project/:projectId/market/:marketId',
		loadComponent: () => import('@features/projects/markets').then(({ Market }) => Market),
		canActivate: [createAuthGuard('/auth')]
	},

	{ path: '**', loadComponent: () => import('@features').then(({ Error }) => Error) }
];
