import { inject, Injectable, Signal, signal } from '@angular/core';
import { Response } from 'ecohub-shared/http/api';
import { ProjectsApi } from 'ecohub-shared/http/api/projects';

import { HttpService } from '../http-service/http-service';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private readonly _DEFAULT_NAV_MAX_COUNT = 5;

	private readonly _navItems = signal<Response<ProjectsApi, '/get_nav'>>([]);
	private readonly _http: HttpService<ProjectsApi> = inject(HttpService);

	public get navigationItems(): Signal<Response<ProjectsApi, '/get_nav'>> {
		return this._navItems.asReadonly();
	}

	public async refreshNavItems(maxCount: number = this._DEFAULT_NAV_MAX_COUNT) {
		const result = await this._http.send('/projects/get_nav', 'GET', { maxCount });

		if (result.success) {
			this._navItems.set(result.response);
		}
	}
}
