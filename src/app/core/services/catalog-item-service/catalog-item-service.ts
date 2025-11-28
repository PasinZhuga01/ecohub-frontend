import { inject, Injectable, signal } from '@angular/core';
import { CatalogsItemsApi } from 'ecohub-shared/http/api/projects/markets';

import { CatalogItemCollection, CatalogItemCreateArgs, CatalogItemObject } from './catalog-item-service.types';

import { HttpService } from '../http-service/http-service';
import { CurrencyService } from '../currency-service/currency-service';
import { processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CatalogItemService {
	private readonly _items = signal<CatalogItemCollection>({ array: [], object: {} });
	private readonly _ratedPrices = signal<Record<number, number>>({});

	private readonly _currencies = inject(CurrencyService);
	private readonly _http: HttpService<CatalogsItemsApi> = inject(HttpService);

	public get items() {
		return this._items.asReadonly();
	}

	public get ratedPrices() {
		return this._ratedPrices.asReadonly();
	}

	public async create({ price, ...args }: CatalogItemCreateArgs) {
		const rate = this._currencies.items().object[args.currencyId]?.rate ?? 1;

		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/catalogs_items/create', 'POST', { ...args, price: price * rate }),
			onSuccess: async (response) => {
				this._items.update(({ array, object }) => {
					object[response.id] = response;
					array.unshift(response);

					return { array, object };
				});

				this._ratedPrices.update((prices) => ({ ...prices, [response.id]: response.price / rate }));
			}
		});
	}

	public async recount(id: number, value: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/catalogs_items/edit', 'PATCH', { id, component: 'count', value }),
			onSuccess: async (response) => {
				this._items.update(({ array, object }) => {
					const item = object[id];

					if (item !== undefined) {
						item.count = response.value;
					}

					return { array, object };
				});
			}
		});
	}

	public async reprice(id: number, currencyId: number, value: number) {
		const rate = this._currencies.items().object[currencyId]?.rate ?? 1;

		return processHttpWithoutExtra({
			sendRequest: () =>
				this._http.send('/projects/markets/catalogs_items/edit', 'PATCH', { id, component: 'price', value: value * rate }),
			onSuccess: async (response) => {
				this._items.update(({ array, object }) => {
					const item = object[id];

					if (item !== undefined) {
						item.price = response.value;
					}

					return { array, object };
				});

				this._ratedPrices.update((prices) => ({ ...prices, [id]: response.value / rate }));
			}
		});
	}

	public async remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/catalogs_items/remove', 'DELETE', { id }),
			onSuccess: async () => {
				this._items.update(({ array, object }) => {
					array = array.filter((item) => item.id !== id);
					delete object[id];

					return { array, object };
				});

				this._ratedPrices.update((prices) => {
					delete prices[id];
					return { ...prices };
				});
			}
		});
	}

	public async refreshItems(marketId: number, currencyId: number) {
		const result = await this._http.send('/projects/markets/catalogs_items/get', 'GET', { marketId });

		const array = result.success ? result.response : [];
		const object = array.reduce<CatalogItemObject>((object, item) => {
			object[item.id] = item;

			return object;
		}, {});

		this._items.set({ array, object });

		this.refreshRatedPrices(currencyId);
	}

	public refreshRatedPrices(currencyId: number) {
		const currency = this._currencies.items().object[currencyId];

		if (currency !== undefined) {
			const prices: Record<number, number> = {};

			for (const { id, price } of this._items().array) {
				prices[id] = price / currency.rate;
			}

			this._ratedPrices.set(prices);
		}
	}
}
