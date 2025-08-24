import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./features/home/home').then((c) => c.Home) },
	{ path: 'auth', loadComponent: () => import('./features/auth/auth').then((c) => c.Auth) },
	{ path: 'projects', loadComponent: () => import('./features/projects/projects/projects').then((c) => c.Projects) },
	{ path: 'project/:id', loadComponent: () => import('./features/projects/project/project').then((c) => c.Project) },
	{ path: 'project/:id/edit', loadComponent: () => import('./features/projects/project-edit/project-edit').then((c) => c.ProjectEdit) }
];
