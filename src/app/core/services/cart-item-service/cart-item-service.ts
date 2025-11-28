import { inject, Injectable, signal } from '@angular/core';
import { modifySignalArrayItems } from '@core/utils';
import { Response } from 'ecohub-shared/http/api';
import { CartsItemsApi } from 'ecohub-shared/http/api/projects/markets';

import { HttpService } from '../http-service/http-service';
import { processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CartItemService {
	private readonly _items = signal<Response<CartsItemsApi, '/get'>>([]);
	private readonly _http: HttpService<CartsItemsApi> = inject(HttpService);

	public get items() {
		return this._items.asReadonly();
	}

	public async add(marketId: number, catalogItemId: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/carts_items/add', 'POST', { marketId, catalogItemId }),
			onSuccess: async (response) => {
				this._items.update((items) => {
					for (let i = 0; i < items.length; i++) {
						if (items[i]!.id === response.id) {
							items[i] = response;

							return [...items];
						}
					}

					return [...items, response];
				});
			}
		});
	}

	public async recount(id: number, count: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/carts_items/recount', 'PATCH', { id, count }),
			onSuccess: async (response) => {
				modifySignalArrayItems(this._items, {
					condition: (item) => item.id === id,
					modify: (item) => (item.count = response.count)
				});
			}
		});
	}

	public async remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/carts_items/remove', 'DELETE', { id }),
			onSuccess: async () => this._items.update((items) => items.filter((item) => item.id !== id))
		});
	}

	public async clear(marketId: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/carts_items/clear', 'DELETE', { marketId }),
			onSuccess: async () => this._items.set([])
		});
	}

	public async refreshItems(marketId: number) {
		const result = await this._http.send('/projects/markets/carts_items/get', 'GET', { marketId });
		const items = result.success ? result.response : [];

		this._items.set(items);
	}
}
