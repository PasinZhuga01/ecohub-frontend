import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageService, RouterService, Route } from '@core/services';

export function createAuthGuard(redirectPath: Route, isRedirectedIfAuthorized: boolean = false): CanActivateFn {
	return () => {
		const router = inject(RouterService);
		const storage = inject(StorageService);

		const isAuthorized = storage.token() !== null;
		const isShouldRedirect = isAuthorized === isRedirectedIfAuthorized;

		if (isShouldRedirect) {
			router.goto(redirectPath);
		}

		return !isShouldRedirect;
	};
}
