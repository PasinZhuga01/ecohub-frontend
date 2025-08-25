import { Injectable } from '@angular/core';

import { CatalogItemsObject } from './market-edit.types';

import { HttpService } from '../../../../core/http-service/http-service';
import {
	Currencies as CurrenciesRequests,
	Markets as MarketsRequests,
	CatalogsItems as CatalogsItemsRequests
} from '../../../../core/http-service/types/requests';
import {
	Currencies as CurrenciesResponses,
	Markets as MarketsResponses,
	CatalogsItems as CatalogsItemsResponses
} from '../../../../core/http-service/types/responses';
import { MessageBoxObject } from '../../../../core/message-box-manager/message-box-manager.types';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';
import { MarketCatalogItemsEditSchema } from '../../../../ui/markets/market-items/market-items.types';

@Injectable({
	providedIn: 'root'
})
export class MarketEditService {
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

	public async getCatalogItemsList(
		marketId: number,
		currentRate: () => number,
		onCountChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void,
		onPriceChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void
	): Promise<CatalogItemsObject> {
		const response = await this.http.get<CatalogsItemsRequests.GetRequest, CatalogsItemsResponses.GetResponse>(
			'/projects/markets/catalogs_items/get',
			{ marketId }
		);

		if (response.success) {
			return {
				items: response.response,
				listItems: response.response.map<TableRowConfig<MarketCatalogItemsEditSchema>>((item) =>
					this.mapItemToRow(item, currentRate, onCountChange, onPriceChange)
				)
			};
		}

		return { items: [], listItems: [] };
	}

	public async rename(id: number, name: string): Promise<MessageBoxObject<'Ошибка' | 'Успех'>> {
		const response = await this.http.patch<MarketsRequests.RenameRequest, MarketsResponses.RenameResponse>('/projects/markets/rename', {
			id,
			name
		});

		if (!response.success) {
			switch (response.response.code) {
				case 'NAME_TAKEN':
					return { header: 'Ошибка', description: 'Рынок с таким названием уже существует' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return { header: 'Успех', description: `Рынок успешно переименован в "${response.response.name}"` };
	}

	public async createItem(
		marketId: number,
		name: string,
		count: number,
		price: number,
		currentRate: () => number,
		onCountChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void,
		onPriceChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void
	): Promise<CatalogItemsObject | MessageBoxObject<'Ошибка'>> {
		const response = await this.http.post<CatalogsItemsRequests.CreateRequest, CatalogsItemsResponses.CreateResponse>(
			'/projects/markets/catalogs_items/create',
			{ marketId, name, count, price }
		);

		if (!response.success) {
			switch (response.response.code) {
				case 'NAME_TAKEN':
					return { header: 'Ошибка', description: 'Товар с таким названием уже существует' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return {
			items: [response.response],
			listItems: [this.mapItemToRow(response.response, currentRate, onCountChange, onPriceChange)]
		};
	}

	public async editItem(id: number, component: 'count' | 'price', value: number) {
		const response = await this.http.patch<CatalogsItemsRequests.EditRequest, CatalogsItemsResponses.EditResponse>(
			'/projects/markets/catalogs_items/edit',
			{
				id,
				component,
				value
			}
		);

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	public async removeItem(id: number): Promise<boolean> {
		return (
			await this.http.delete<CatalogsItemsRequests.RemoveRequest, CatalogsItemsResponses.RemoveResponse>(
				'/projects/markets/catalogs_items/remove',
				{ id }
			)
		).success;
	}

	private mapItemToRow(
		item: CatalogsItemsResponses.GetResponse[number],
		currentRate: () => number,
		onCountChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void,
		onPriceChange: (item: CatalogsItemsResponses.GetResponse[number], value: number) => void
	): TableRowConfig<MarketCatalogItemsEditSchema> {
		return {
			id: item.id,
			cells: {
				a: {
					index: { type: 'text', text: item.name }
				},
				b: {
					index: {
						type: 'number',
						number: item.count,
						config: { isStepperable: true, min: 1 },
						onChange: (value) => onCountChange(item, value),
						isEditing: true
					}
				},
				c: {
					index: {
						type: 'number',
						number: item.price / currentRate(),
						config: { isStepperable: true, min: 1 },
						onChange: (value) => onPriceChange(item, value),
						isEditing: true
					}
				},
				d: {
					remove: { type: 'button', text: 'Удалить' }
				}
			}
		};
	}
}
