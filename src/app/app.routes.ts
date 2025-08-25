import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./features/home/home').then((c) => c.Home) },
	{ path: 'auth', loadComponent: () => import('./features/auth/auth').then((c) => c.Auth) },
	{ path: 'projects', loadComponent: () => import('./features/projects/projects/projects').then((c) => c.Projects) },
	{ path: 'project/:id', loadComponent: () => import('./features/projects/project/project').then((c) => c.Project) },
	{ path: 'project/:id/edit', loadComponent: () => import('./features/projects/project-edit/project-edit').then((c) => c.ProjectEdit) },
	{ path: 'project/:id/currencies', loadComponent: () => import('./features/projects/currencies/currencies').then((c) => c.Currencies) },
	{ path: 'project/:id/markets', loadComponent: () => import('./features/projects/markets/markets/markets').then((c) => c.Markets) },
	{
		path: 'project/:projectId/market/:marketId',
		loadComponent: () => import('./features/projects/markets/market/market').then((c) => c.Market)
	},
	{
		path: 'project/:projectId/market/:marketId/edit',
		loadComponent: () => import('./features/projects/markets/market-edit/market-edit').then((c) => c.MarketEdit)
	}
];
