import { Injectable } from '@angular/core';

import { CartItemsObject, CatalogItemsObject } from './market.types';

import { HttpService } from '../../../../core/http-service/http-service';
import {
	Currencies as CurrenciesRequests,
	CatalogsItems as CatalogsItemsRequests,
	CartsItems as CartsItemsRequests
} from '../../../../core/http-service/types/requests';
import {
	Currencies as CurrenciesResponses,
	CatalogsItems as CatalogsItemsResponses,
	CartsItems as CartsItemsResponses
} from '../../../../core/http-service/types/responses';

@Injectable({
	providedIn: 'root'
})
export class MarketService {
	public constructor(private http: HttpService) {}

	public async getCurrenciesList(projectId: number): Promise<CurrenciesResponses.GetResponse> {
		const response = await this.http.get<CurrenciesRequests.GetRequest, CurrenciesResponses.GetResponse>('/projects/currencies/get', {
			projectId
		});

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return response.response;
	}

	public async getCatalogItemsList(id: number): Promise<CatalogItemsObject> {
		const response = await this.http.get<CatalogsItemsRequests.GetRequest, CatalogsItemsResponses.GetResponse>(
			'/projects/markets/catalogs_items/get',
			{ marketId: id }
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return {
			items: response.response,
			listItems: response.response.map((item) => this.mapCatalogItemObjectToRow(item))
		};
	}

	public async getCartItemsList(
		id: number,
		catalogItems: { id: number; name: string; count: number; price: number }[],
		onRecount: (cartItem: { id: number; count: number }, catalogItem: { count: number; price: number }, value: number) => void
	): Promise<CartItemsObject> {
		const response = await this.http.get<CartsItemsRequests.GetRequest, CartsItemsResponses.GetResponse>(
			'/projects/markets/carts_items/get',
			{ marketId: id }
		);

		if (response.success) {
			return {
				items: response.response,
				listItems: response.response.map((item) =>
					this.mapCartItemObjectToRow(
						item,
						catalogItems[catalogItems.findIndex((value) => value.id === item.catalogItemId)]!,
						onRecount
					)
				)
			};
		}

		return { items: [], listItems: [] };
	}

	public async addItemToCart(
		marketId: number,
		catalogItem: { id: number; name: string; count: number; price: number },
		onRecount: (cartItem: { id: number; count: number }, catalogItem: { count: number; price: number }, value: number) => void
	): Promise<CartItemsObject> {
		const response = await this.http.post<CartsItemsRequests.AddRequest, CartsItemsResponses.AddResponse>(
			'/projects/markets/carts_items/add',
			{ marketId, catalogItemId: catalogItem.id }
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return {
			items: [response.response],
			listItems: [this.mapCartItemObjectToRow(response.response, catalogItem, onRecount)]
		};
	}

	public async recountCartItem(id: number, count: number) {
		const response = await this.http.patch<CartsItemsRequests.RecountRequest, CartsItemsResponses.RecountResponse>(
			'/projects/markets/carts_items/recount',
			{ id, count }
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	public async removeItem(id: number) {
		const response = await this.http.delete<CartsItemsRequests.RemoveRequest, CartsItemsResponses.RemoveResponse>(
			'/projects/markets/carts_items/remove',
			{ id }
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	public async clearCart(marketId: number) {
		const response = await this.http.delete<CartsItemsRequests.ClearRequest, CartsItemsResponses.ClearResponse>(
			'/projects/markets/carts_items/clear',
			{ marketId }
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	private mapCatalogItemObjectToRow(cartItem: CatalogItemsObject['items'][number]): CatalogItemsObject['listItems'][number] {
		return {
			id: cartItem.id,
			cells: {
				a: {
					index: { type: 'text', text: cartItem.name }
				},
				b: {
					index: { type: 'number', number: cartItem.count }
				},
				c: {
					index: { type: 'number', number: cartItem.price }
				},
				d: {
					add: { type: 'button', text: 'Добавить в корзину' }
				}
			}
		};
	}

	private mapCartItemObjectToRow(
		item: CartItemsObject['items'][number],
		catalogItem: { id: number; name: string; count: number; price: number },
		onRecount: (cartItem: { id: number; count: number }, catalogItem: { count: number; price: number }, value: number) => void
	): CartItemsObject['listItems'][number] {
		return {
			id: item.id,
			cells: {
				a: {
					index: { type: 'text', text: catalogItem.name }
				},
				b: {
					index: {
						type: 'number',
						number: item.count * catalogItem.count,
						config: { isStepperable: true, min: catalogItem.count, step: catalogItem.count },
						onChange: (value) => onRecount(item, catalogItem, value),
						isEditing: true
					}
				},
				c: {
					index: { type: 'number', number: item.count * catalogItem.price }
				},
				d: {
					remove: { type: 'button', text: 'Удалить' }
				}
			}
		};
	}
}
