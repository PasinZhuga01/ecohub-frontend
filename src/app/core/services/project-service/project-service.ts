import { Response } from 'ecohub-shared/http/api';
import { ProjectsApi } from 'ecohub-shared/http/api/projects';
import { effect, inject, Injectable, Signal, signal } from '@angular/core';

import { HttpService } from '../http-service/http-service';
import { StorageService } from '../storage-service/storage-service';
import { processHttp, processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	private readonly _NAV_MAX_COUNT = 5;

	private readonly _items = signal<Response<ProjectsApi, '/get_page'>>([]);
	private readonly _navItems = signal<Response<ProjectsApi, '/get_nav'>>([]);

	private readonly _storage = inject(StorageService);
	private readonly _http: HttpService<ProjectsApi> = inject(HttpService);

	public constructor() {
		effect(() => {
			this._items();
			this._refreshNavItems();
		});
	}

	public get items(): Signal<Response<ProjectsApi, '/get_page'>> {
		return this._items.asReadonly();
	}

	public get navItems(): Signal<Response<ProjectsApi, '/get_nav'>> {
		return this._navItems.asReadonly();
	}

	public async get(id: number) {
		return processHttp({
			sendRequest: () => this._http.send('/projects/get', 'GET', { id }),
			onSuccess: async (response) => ({ name: response.name })
		});
	}

	public async create(name: string) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/create', 'POST', { name }),
			onSuccess: async (response) => {
				this._items.update((items) => [response, ...items]);
			}
		});
	}

	public async remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/remove', 'DELETE', { id }),
			onSuccess: async () => {
				this._items.update((items) => items.filter((item) => item.id !== id));
			}
		});
	}

	public initializeItems() {
		effect(() => this._refreshItems());
	}

	private async _refreshItems() {
		if (this._storage.token() === null) {
			return this._items.set([]);
		}

		const result = await this._http.send('/projects/get_page', 'GET', {});
		const items = result.success ? result.response : [];

		this._items.set(items);
	}

	private async _refreshNavItems() {
		if (this._storage.token() === null) {
			return this._navItems.set([]);
		}

		const result = await this._http.send('/projects/get_nav', 'GET', { maxCount: this._NAV_MAX_COUNT });
		const navItems = result.success ? result.response : [];

		this._navItems.set(navItems);
	}
}
