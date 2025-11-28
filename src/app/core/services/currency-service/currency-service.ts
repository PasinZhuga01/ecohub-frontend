import { inject, Injectable, signal } from '@angular/core';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';

import { createCurrencyCreateFormData, validateItemIconSrc } from './currency-service.helpers';
import { CurrenciesObject, CurrencyCollection, CurrencyCreateArgs } from './currency-service.types';

import { HttpService } from '../http-service/http-service';
import { processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	private readonly _items = signal<CurrencyCollection>({ array: [], object: {} });
	private readonly _http: HttpService<CurrenciesApi> = inject(HttpService);

	public get items() {
		return this._items.asReadonly();
	}

	public create(args: CurrencyCreateArgs) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/create', 'POST', createCurrencyCreateFormData(args)),
			onSuccess: async (response) =>
				this._items.update(({ array, object }) => {
					const item = validateItemIconSrc(response);

					object[item.id] = item;
					array.push(item);

					return { array, object };
				})
		});
	}

	public shiftRate(projectId: number, value: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/shift', 'PATCH', { projectId, value }),
			onSuccess: async () =>
				this._items.update((items) => {
					for (const item of items.array) {
						item.rate += value;
					}

					return { ...items };
				})
		});
	}

	public rerate(id: number, rate: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/rerate', 'PATCH', { id, rate }),
			onSuccess: async (response) =>
				this._items.update((items) => {
					const item = items.object[id];

					if (item !== undefined) {
						item.rate = response.rate;
					}

					return { ...items };
				})
		});
	}

	public remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/currencies/remove', 'DELETE', { id }),
			onSuccess: async () =>
				this._items.update(({ array, object }) => {
					array = array.filter((item) => item.id !== id);
					delete object[id];

					return { array, object };
				})
		});
	}

	public async refreshItems(projectId: number) {
		const result = await this._http.send('/projects/currencies/get', 'GET', { projectId });

		const array = result.success ? result.response.map((item) => validateItemIconSrc(item)) : [];
		const object = array.reduce<CurrenciesObject>((object, item) => {
			object[item.id] = item;

			return object;
		}, {});

		this._items.set({ array, object });
	}
}
