import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrenciesService } from './currencies.service';
import { CurrencyObject } from './currencies.types';

import { CurrencyCreate } from '../../../ui/currencies/currency-create/currency-create';
import { CurrencyList } from '../../../ui/currencies/currency-list/currency-list';
import { CurrencyConvert } from '../../../ui/currencies/currency-convert/currency-convert';
import { CurrencyShift } from '../../../ui/currencies/currency-shift/currency-shift';
import { MessageBoxManager } from '../../../core/message-box-manager/message-box-manager';
import { MessageBox } from '../../../ui/widgets/message-box/message-box';
import { CurrencyType } from '../../../ui/currencies/currency-convert/currency-convert.types';
import env from '../../../env';
import { TableRowConfig } from '../../../ui/widgets/table-row/table-row.types';
import { CurrencyListSchema } from '../../../ui/currencies/currency-list/currency-list.types';

@Component({
	selector: 'app-currencies',
	imports: [CurrencyCreate, CurrencyList, CurrencyConvert, CurrencyShift, MessageBox],
	providers: [MessageBoxManager],
	templateUrl: './currencies.html',
	styleUrl: './currencies.css'
})
export class Currencies implements OnInit {
	protected projectId = signal<number>(-1);

	protected createdIconSrc = signal<string>('');
	protected convertResult = signal<Record<CurrencyType, { count: number; iconSrc: string }> | null>(null);

	protected items = signal<{ [id: number]: CurrencyObject['item'] }>({});
	protected selectItems = signal<CurrencyObject['selectItem'][]>([]);
	protected listItems = signal<CurrencyObject['listItem'][]>([]);

	public constructor(
		private service: CurrenciesService,
		private route: ActivatedRoute,
		protected messageBox: MessageBoxManager<'Ошибка' | 'Внимание'>
	) {
		this.projectId.set(Number(this.route.snapshot.paramMap.get('id')));
	}

	public async ngOnInit() {
		for (const object of await this.service.getList(this.projectId())) {
			this.pushItem(object);
		}
	}

	protected onCreateError(description: string) {
		this.messageBox.setMessage({ header: 'Ошибка', description });
	}

	protected async onListExecute(event: { id: number; row: TableRowConfig<CurrencyListSchema>; action: 'modify' | 'remove' }) {
		if (event.action === 'modify') {
			return await this.toggleModifyMode(event.id, event.row.cells.c.index);
		}
		if (event.action === 'remove') {
			return await this.remove(event.id);
		}
	}

	protected async uploadCreatedIcon() {
		this.createdIconSrc.set(await this.service.uploadIcon());
	}

	protected async create({ name, rate, iconSrc }: { name: string; rate: number; iconSrc: string }) {
		const response = await this.service.create(this.projectId(), name, rate, iconSrc);

		if ('header' in response) {
			return this.messageBox.setMessage(response);
		}

		this.pushItem(response);
	}

	protected async shiftRates(value: number) {
		await this.service.shiftRates(this.projectId(), value);

		const items: { [id: number]: CurrencyObject['item'] } = {};
		const listItems: CurrencyObject['listItem'][] = [];

		for (let i = 0; i < this.listItems().length; i++) {
			const listItem = this.listItems()[i];

			if (listItem === undefined) {
				throw new Error('Currencies list item for update not found');
			}

			const item = this.items()[listItem.id];

			if (item === undefined) {
				throw new Error('Currencies item for update not found');
			}

			item.rate += value;
			listItem.cells.c.index.number += value;

			items[item.id] = item;
			listItems.push(listItem);
		}

		this.items.set(items);
		this.listItems.set(listItems);
	}

	protected convert(data: Record<CurrencyType, number> & { count: number }) {
		const fromItem = this.items()[data.from];
		const toItem = this.items()[data.to];

		if (fromItem === undefined || toItem === undefined) {
			throw new Error('Currencies item or items for convert is not defined');
		}

		this.convertResult.set({
			from: { count: data.count, iconSrc: new URL(`images/${fromItem.iconSrc}`, env.serverUrl).toString() },
			to: {
				count: Number(((fromItem.rate * data.count) / toItem.rate).toFixed(3)),
				iconSrc: new URL(`images/${toItem.iconSrc}`, env.serverUrl).toString()
			}
		});
	}

	protected async toggleModifyMode(id: number, cellItem: { number: number; isEditing?: true }) {
		if (cellItem.isEditing) {
			delete cellItem.isEditing;
			await this.modify(id, cellItem.number);
		} else {
			cellItem.isEditing = true;
		}
	}

	private async modify(id: number, rate: number) {
		await this.service.modify(id, rate);

		const item = this.items()[id];

		if (item === undefined) {
			throw new Error('Currencies item for modify is not defined.');
		}

		item.rate = rate;
	}

	private async remove(id: number) {
		this.messageBox.setMessage({
			header: 'Внимание',
			description: `Вы уверены, что хотите удалить валюту ${this.items()[id]?.name}?`,
			onConfirm: async () => {
				await this.service.remove(id);
				this.removeItem(id);
			}
		});
	}

	private pushItem({ item, selectItem, listItem }: CurrencyObject) {
		this.items.update((items) => ({ ...items, [item.id]: item }));
		this.selectItems.update((items) => [selectItem, ...items]);
		this.listItems.update((items) => [listItem, ...items]);
	}

	private removeItem(id: number) {
		this.items.update((items) => {
			const { [id]: _, ...newItems } = items;

			return newItems;
		});

		this.selectItems.update((items) => items.filter((item) => item.id !== id));
		this.listItems.update((items) => items.filter((item) => item.id !== id));
	}
}
