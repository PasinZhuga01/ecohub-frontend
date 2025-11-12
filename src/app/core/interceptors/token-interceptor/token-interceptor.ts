import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '@core/services';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	const storage = inject(StorageService);
	const token = storage.token();

	if (token !== null) {
		return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
	}

	return next(req);
};
