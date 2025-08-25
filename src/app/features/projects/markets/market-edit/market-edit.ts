import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { MarketEditService } from './market-edit.service';

import { MarketSelectCurrency } from '../../../../ui/markets/market-select-currency/market-select-currency';
import { EntityNameForm } from '../../../../ui/shared/entity-name-form/entity-name-form';
import { MarketCreateItem } from '../../../../ui/markets/market-create-item/market-create-item';
import { MarketItems } from '../../../../ui/markets/market-items/market-items';
import { ButtonInput } from '../../../../ui/controls/button-input/button-input';
import { MessageBoxManager } from '../../../../core/message-box-manager/message-box-manager';
import { StorageService } from '../../../../core/storage-service/storage-service';
import { MessageBox } from '../../../../ui/widgets/message-box/message-box';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';
import { MarketCatalogItemsEditSchema, MarketItemsAction, MarketItemsSchema } from '../../../../ui/markets/market-items/market-items.types';

import env from '../../../../env';

@Component({
	selector: 'app-market-edit',
	imports: [MarketSelectCurrency, EntityNameForm, MarketCreateItem, MarketItems, ButtonInput, RouterLink, MessageBox],
	providers: [MessageBoxManager],
	templateUrl: './market-edit.html',
	styleUrl: './market-edit.css'
})
export class MarketEdit implements OnInit {
	protected projectId = signal<number>(0);
	protected marketId = signal<number>(0);

	protected currencies = signal<{ [id: number]: { id: number; iconSrc: string; name: string; rate: number } }>({});
	protected currenciesSelectItems = signal<{ id: number; text: string }[]>([]);

	protected catalogItems = signal<{ id: number; price: number }[]>([]);
	protected catalogItemsList = signal<TableRowConfig<MarketCatalogItemsEditSchema>[]>([]);

	protected currentCurrency = signal<{ id: number; iconSrc: string; name: string; rate: number } | null>(null);

	public constructor(
		private service: MarketEditService,
		private route: ActivatedRoute,
		private storage: StorageService,
		private router: Router,
		protected messageBox: MessageBoxManager<'Ошибка' | 'Успех'>
	) {
		this.projectId.set(Number(this.route.snapshot.paramMap.get('projectId')));
		this.marketId.set(Number(this.route.snapshot.paramMap.get('marketId')));
	}

	public async ngOnInit() {
		for (const item of await this.service.getCurrenciesList(this.projectId())) {
			this.currencies.update((items) => ({ ...items, [item.id]: { ...item, iconSrc: `${env.serverUrl}/images/${item.iconSrc}` } }));
			this.currenciesSelectItems.update((items) => [...items, { id: item.id, text: item.name }]);
		}

		const marketCurrencyId = this.storage.getItem('marketsCurrenciesIndex')[this.marketId()];

		let hasNotCurrentCurrency = true;

		if (marketCurrencyId !== undefined) {
			if (this.currencies()[marketCurrencyId] !== undefined) {
				this.setCurrentCurrency(marketCurrencyId);
				hasNotCurrentCurrency = false;
			}
		}

		if (!hasNotCurrentCurrency) {
			const firstCurrencyId = this.currencies()[Number(Object.keys(this.currencies())[0])]?.id;

			if (firstCurrencyId !== undefined) {
				this.setCurrentCurrency(firstCurrencyId);
			} else {
				return this.messageBox.setMessage({
					header: 'Ошибка',
					description: 'Невозможно проводить операции, поскольку отсутствуют валюты для рассчёта',
					onConfirm: () => this.router.navigate(['../../../currencies'], { relativeTo: this.route }),
					onCancel: () => this.router.navigate(['../../../currencies'], { relativeTo: this.route })
				});
			}
		}

		const currentCurencyRate = () => this.currentCurrency()?.rate ?? 1;
		const catalogItems = await this.service.getCatalogItemsList(
			this.marketId(),
			() => this.currentCurrency()?.rate ?? 1,
			(item, value) => this.editItem(item.id, 'count', value),
			(item, value) => this.editItem(item.id, 'price', value * currentCurencyRate())
		);

		this.catalogItems.set(catalogItems.items);
		this.catalogItemsList.set(catalogItems.listItems);
	}

	protected onError(description: string) {
		this.messageBox.setMessage({ header: 'Ошибка', description });
	}

	protected async onCatalogItemsListExecute(event: { id: number; row: TableRowConfig<MarketItemsSchema>; action: MarketItemsAction }) {
		if (event.action === 'remove') {
			this.removeItem(event.id);
		}
	}

	protected async rename(name: string) {
		const result = await this.service.rename(this.marketId(), name);

		this.messageBox.setMessage(result);
	}

	protected async createItem(event: { name: string; count: number; price: number }) {
		const currentCurencyRate = () => this.currentCurrency()?.rate ?? 1;
		const result = await this.service.createItem(
			this.marketId(),
			event.name,
			event.count,
			event.price * currentCurencyRate(),
			currentCurencyRate,
			(item, value) => this.editItem(item.id, 'count', value),
			(item, value) => this.editItem(item.id, 'price', value * currentCurencyRate())
		);

		if ('header' in result) {
			return this.messageBox.setMessage(result);
		}

		this.catalogItems.update((items) => [result.items[0]!, ...items]);
		this.catalogItemsList.update((items) => [result.listItems[0]!, ...items]);
	}

	protected async editItem(id: number, component: 'count' | 'price', value: number) {
		await this.service.editItem(id, component, value);

		if (component === 'price') {
			const item = this.catalogItems().find((item) => item.id === id);

			if (item !== undefined) {
				item.price = value;
			}
		}
	}

	protected async removeItem(id: number) {
		if (await this.service.removeItem(id)) {
			this.catalogItems.update((items) => items.filter((item) => item.id !== id));
			this.catalogItemsList.update((items) => items.filter((item) => item.id !== id));
		}
	}

	protected setCurrentCurrency(currencyId: number) {
		this.storage.setItem('marketsCurrenciesIndex', {
			...this.storage.getItem('marketsCurrenciesIndex'),
			[this.marketId()]: currencyId
		});
		this.currentCurrency.set(this.currencies()[currencyId]!);

		for (let i = 0; i < this.catalogItems().length; i++) {
			this.catalogItemsList()[i]!.cells.c.index.number = this.catalogItems()[i]!.price / (this.currentCurrency()?.rate ?? 1);
		}
	}
}
