import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Response } from 'ecohub-shared/http/api';
import { ProjectsApi } from 'ecohub-shared/http/api/projects';

import { HttpService } from '../http-service/http-service';
import { StorageService } from '../storage-service/storage-service';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	public readonly NAV_MAX_COUNT = 5;

	private readonly _navItems = signal<Response<ProjectsApi, '/get_nav'>>([]);

	private readonly _storage = inject(StorageService);
	private readonly _http: HttpService<ProjectsApi> = inject(HttpService);

	public constructor() {
		effect(() => this._refreshNavItems());
	}

	public get navItems(): Signal<Response<ProjectsApi, '/get_nav'>> {
		return this._navItems.asReadonly();
	}

	private async _refreshNavItems() {
		if (this._storage.token() === null) {
			return this._navItems.set([]);
		}

		const result = await this._http.send('/projects/get_nav', 'GET', { maxCount: this.NAV_MAX_COUNT });
		const navItems = result.success ? result.response : [];

		this._navItems.set(navItems);
	}
}
