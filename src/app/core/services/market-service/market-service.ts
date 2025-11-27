import { inject, Injectable, signal } from '@angular/core';
import { modifySignalArrayItems } from '@core/utils';
import { Response } from 'ecohub-shared/http/api';
import { MarketsApi } from 'ecohub-shared/http/api/projects/markets';

import { HttpService } from '../http-service/http-service';
import { processHttp, processHttpWithoutExtra } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class MarketService {
	private readonly _items = signal<Response<MarketsApi, '/get_list'>>([]);
	private readonly _http: HttpService<MarketsApi> = inject(HttpService);

	public get items() {
		return this._items.asReadonly();
	}

	public async get(id: number) {
		return processHttp({
			sendRequest: () => this._http.send('/projects/markets/get', 'GET', { id }),
			onSuccess: async (response) => ({ name: response.name, currencyId: response.currencyId })
		});
	}

	public async create(projectId: number, name: string) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/create', 'POST', { projectId, name }),
			onSuccess: async (response) => {
				this._items.update((items) => [response, ...items]);
			}
		});
	}

	public async setCurrency(marketId: number, currencyId: number) {
		return processHttp({
			sendRequest: () => this._http.send('/projects/markets/set_currency', 'PATCH', { marketId, currencyId }),
			onSuccess: async () => ({ currencyId })
		});
	}

	public async rename(id: number, name: string) {
		return processHttp({
			sendRequest: () => this._http.send('/projects/markets/rename', 'PATCH', { id, name }),
			onSuccess: async (response) => {
				modifySignalArrayItems(this._items, {
					condition: (item) => item.id === id,
					modify: (item) => (item.name = name)
				});

				return response;
			}
		});
	}

	public async remove(id: number) {
		return processHttpWithoutExtra({
			sendRequest: () => this._http.send('/projects/markets/remove', 'DELETE', { id }),
			onSuccess: async () => {
				this._items.update((items) => items.filter((item) => item.id !== id));
			}
		});
	}

	public async refreshItems(projectId: number) {
		const result = await this._http.send('/projects/markets/get_list', 'GET', { projectId });
		const items = result.success ? result.response : [];

		this._items.set(items);
	}
}
