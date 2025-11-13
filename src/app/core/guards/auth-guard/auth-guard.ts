import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/services';

export function createAuthGuard(redirectPath: string, isRedirectedIfAuthorized: boolean = false): CanActivateFn {
	return () => {
		const router = inject(Router);
		const storage = inject(StorageService);

		const isAuthorized = storage.token() !== null;
		const isShouldRedirect = isAuthorized === isRedirectedIfAuthorized;

		if (isShouldRedirect) {
			router.navigate([redirectPath]);
		}

		return !isShouldRedirect;
	};
}
