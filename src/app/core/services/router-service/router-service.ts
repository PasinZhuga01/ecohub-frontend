import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from './router-service.types';

@Injectable({
	providedIn: 'root'
})
export class RouterService {
	private readonly _router = inject(Router);

	public goto(route: Route) {
		this._router.navigate([route]);
	}
}
