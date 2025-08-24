import { Injectable } from '@angular/core';

import { CurrencyObject } from './currencies.types';

import { Currencies as Requests } from '../../../core/http-service/types/requests';
import { Currencies as Responses } from '../../../core/http-service/types/responses';
import { HttpService } from '../../../core/http-service/http-service';
import { MessageBoxObject } from '../../../core/message-box-manager/message-box-manager.types';

import env from '../../../env';

@Injectable({
	providedIn: 'root'
})
export class CurrenciesService {
	public constructor(private http: HttpService) {}

	public async getList(projectId: number): Promise<CurrencyObject[]> {
		const response = await this.http.get<Requests.GetRequest, Responses.GetResponse>('/projects/currencies/get', { projectId });

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return response.response.map((item) => this.mapItemToObject(item));
	}

	public async uploadIcon(): Promise<string> {
		return await new Promise((resolve) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';

			input.onchange = () => {
				const file = input.files?.[0];
				if (!file) return resolve('');

				const reader = new FileReader();
				reader.onload = () => {
					const iconSrc = reader.result as string;
					resolve(iconSrc);
				};
				reader.readAsDataURL(file);
			};

			input.click();
		});
	}

	public async create(
		projectId: number,
		name: string,
		rate: number,
		iconSrc: string
	): Promise<MessageBoxObject<'Ошибка'> | CurrencyObject> {
		const formData = new FormData();

		formData.append('projectId', String(projectId));
		formData.append('name', name);
		formData.append('rate', String(rate));
		formData.append('icon', this.base64ToBlob(iconSrc), 'image.png');

		const response = await this.http.post<FormData, Responses.CreateResponse>('/projects/currencies/create', formData);

		if (!response.success) {
			switch (response.response.code) {
				case 'NAME_TAKEN':
					return { header: 'Ошибка', description: 'Валюта с таким названием уже существует' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return this.mapItemToObject(response.response);
	}

	public async shiftRates(projectId: number, value: number) {
		const response = await this.http.patch<Requests.ShiftRequest, Responses.ShiftResponse>('/projects/currencies/shift', {
			projectId,
			value
		});

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	public async modify(id: number, rate: number) {
		const response = await this.http.patch<Requests.RerateRequest, Responses.RerateResponse>('/projects/currencies/rerate', {
			id,
			rate
		});

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	public async remove(id: number) {
		const response = await this.http.delete<Requests.RemoveRequest, Responses.RemoveResponse>('/projects/currencies/remove', { id });

		if (!response.success) {
			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}
	}

	private base64ToBlob(base64: string): Blob {
		const [meta, content] = base64.split(',');

		if (meta === undefined || content === undefined) {
			throw new Error('base64 string was in an invalid format');
		}

		const mime = meta.match(/:(.*?);/)?.[1] ?? 'image/png';
		const byteCharacters = atob(content);
		const byteArrays = [];

		for (let i = 0; i < byteCharacters.length; i++) {
			byteArrays.push(byteCharacters.charCodeAt(i));
		}

		return new Blob([new Uint8Array(byteArrays)], { type: mime });
	}

	private mapItemToObject(item: CurrencyObject['item']): CurrencyObject {
		return { item, selectItem: this.mapItemToSelectItem(item), listItem: this.mapItemToRow(item) };
	}

	private mapItemToRow(item: CurrencyObject['item']): CurrencyObject['listItem'] {
		return {
			id: item.id,
			cells: {
				a: {
					index: { type: 'icon', iconSrc: new URL(`images/${item.iconSrc}`, env.serverUrl).toString() }
				},
				b: {
					index: { type: 'text', text: item.name }
				},
				c: {
					index: { type: 'number', number: item.rate, config: { isStepperable: true, min: 1 } }
				},
				d: {
					modify: { type: 'button', text: 'Изменить' },
					remove: { type: 'button', text: 'Удалить' }
				}
			}
		};
	}

	private mapItemToSelectItem(item: CurrencyObject['item']): CurrencyObject['selectItem'] {
		return { id: item.id, text: item.name };
	}
}
