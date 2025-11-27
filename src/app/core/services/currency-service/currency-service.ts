import { inject, Injectable, signal } from '@angular/core';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';
import { Response } from 'ecohub-shared/http/api';
import { modifySignalArrayItems } from '@core/utils';
import env from '@env';

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
			sendRequest: () => this._http.send('/projects/currencies/create', 'POST', createCurrencyCreateFormData(this._projectId, args)),
			onSuccess: async () => {}
		});
	}

	public shiftRate(value: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/shift', 'PATCH', { projectId: this._projectId, value }),
			onSuccess: async () =>
				modifySignalArrayItems(this._items, {
					modify: (item) => (item.rate += value)
				})
		});
	}

	public rerate(id: number, rate: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/rerate', 'PATCH', { id, rate }),
			onSuccess: async (response) =>
				modifySignalArrayItems(this._items, {
					condition: (item) => item.id === id,
					modify: (item) => (item.rate = response.rate)
				})
		});
	}

	public remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/remove', 'DELETE', { id }),
			onSuccess: async () => this._items.update((items) => items.filter((item) => item.id !== id))
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

		for (const item of items) {
			item.iconSrc = new URL(`images/${item.iconSrc}`, env.serverUrl).toString();
		}

		this._items.set(items);
	}
}
