import { inject, Injectable, signal } from '@angular/core';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';
import { Response } from 'ecohub-shared/http/api';

import { createCurrencyCreateFormData } from './currency-service.helpers';
import { CurrencyCreateArgs } from './currency-service.types';

import { HttpService } from '../http-service/http-service';
import { processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	private readonly _items = signal<Response<CurrenciesApi, '/get'>>([]);
	private readonly _http: HttpService<CurrenciesApi> = inject(HttpService);

	private _projectId = -1;

	public get items() {
		return this._items.asReadonly();
	}

	public create(args: CurrencyCreateArgs) {
		return processHttpWithoutExtra({
			sendRequest: async () =>
				this._http.send('/projects/currencies/create', 'POST', createCurrencyCreateFormData(this._projectId, args)),
			onSuccess: async () => {}
		});
	}

	public async setProjectId(id: number) {
		if (this._projectId !== id) {
			this._projectId = id;

			await this._refreshItems();
		}
	}

	private async _refreshItems() {
		const result = await this._http.send('/projects/currencies/get', 'GET', { projectId: this._projectId });
		const items = result.success ? result.response : [];

		this._items.set(items);
	}
}
