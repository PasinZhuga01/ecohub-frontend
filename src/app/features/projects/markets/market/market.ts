import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { MarketService } from './market.service';
import { CatalogItemsObject } from './market.types';

import { MarketSelectCurrency } from '../../../../ui/markets/market-select-currency/market-select-currency';
import { MarketItems } from '../../../../ui/markets/market-items/market-items';
import { StorageService } from '../../../../core/storage-service/storage-service';
import { MessageBoxManager } from '../../../../core/message-box-manager/message-box-manager';
import { MessageBox } from '../../../../ui/widgets/message-box/message-box';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';
import {
	MarketCartItemsSchema,
	MarketCatalogItemsSchema,
	MarketItemsAction,
	MarketItemsSchema
} from '../../../../ui/markets/market-items/market-items.types';
import { ButtonInput } from '../../../../ui/controls/button-input/button-input';

import env from '../../../../env';

@Component({
	selector: 'app-market',
	imports: [MarketSelectCurrency, MarketItems, MessageBox, ButtonInput, RouterLink],
	providers: [MessageBoxManager],
	templateUrl: './market.html',
	styleUrl: './market.css'
})
export class Market implements OnInit {
	protected projectId = signal<number>(0);
	protected marketId = signal<number>(0);

	protected currencies = signal<{ [id: number]: { id: number; iconSrc: string; name: string; rate: number } }>({});
	protected currenciesSelectItems = signal<{ id: number; text: string }[]>([]);

	protected cartItems = signal<{ id: number; catalogItemId: number; count: number }[]>([]);
	protected cartItemsList = signal<TableRowConfig<MarketCartItemsSchema>[]>([]);

	protected catalogItems = signal<CatalogItemsObject['items']>([]);
	protected catalogItemsList = signal<TableRowConfig<MarketCatalogItemsSchema>[]>([]);

	protected currentCurrency = signal<{ id: number; iconSrc: string; name: string; rate: number } | null>(null);
	protected sumPrice = signal<number>(0);

	public constructor(
		private service: MarketService,
		private route: ActivatedRoute,
		private storage: StorageService,
		protected messageBox: MessageBoxManager<'Ошибка' | 'Внимание'>,
		protected router: Router
	) {
		this.projectId.set(Number(this.route.snapshot.paramMap.get('projectId')));
		this.marketId.set(Number(this.route.snapshot.paramMap.get('marketId')));

		this.cartItemsList.set([this.createCartFinalCostListItem()]);
	}

	public async ngOnInit() {
		for (const item of await this.service.getCurrenciesList(this.projectId())) {
			this.currencies.update((items) => ({ ...items, [item.id]: { ...item, iconSrc: `${env.serverUrl}/images/${item.iconSrc}` } }));
			this.currenciesSelectItems.update((items) => [...items, { id: item.id, text: item.name }]);
		}

		const catalogItems = await this.service.getCatalogItemsList(this.marketId());

		this.catalogItems.set(catalogItems.items);
		this.catalogItemsList.set(catalogItems.listItems);

		const cartsItems = await this.service.getCartItemsList(this.marketId(), this.catalogItems(), (cartItem, catalogItem, value) =>
			this.updateCartItemPrice(cartItem, catalogItem, value)
		);

		this.cartItems.set(cartsItems.items);
		this.cartItemsList.update((items) => [...cartsItems.listItems, ...items]);

		this.updateCartPrices();

		const marketCurrencyId = this.storage.getItem('marketsCurrenciesIndex')[this.marketId()];

		if (marketCurrencyId !== undefined) {
			if (this.currencies()[marketCurrencyId] !== undefined) {
				return this.setCurrentCurrency(marketCurrencyId);
			}
		}

		const firstCurrencyId = this.currencies()[Number(Object.keys(this.currencies())[0])]?.id;

		if (firstCurrencyId !== undefined) {
			return this.setCurrentCurrency(firstCurrencyId);
		}

		this.messageBox.setMessage({
			header: 'Ошибка',
			description: 'Невозможно проводить операции, поскольку отсутствуют валюты для рассчёта'
		});
	}

	protected onMessageBoxClick() {
		this.router.navigate(['../../currencies'], { relativeTo: this.route });
	}

	protected onCatalogItemsListExecute(event: { id: number; row: TableRowConfig<MarketItemsSchema>; action: MarketItemsAction }) {
		if (event.action === 'add') {
			const cells = event.row.cells;

			this.addItemToCart(event.id, cells.a.index.text, cells.b.index.number, cells.c.index.number);
		}
	}

	protected onCartItemsListExecute(event: { id: number; row: TableRowConfig<MarketItemsSchema>; action: MarketItemsAction }) {
		if (event.action === 'clear') {
			return this.clearCart();
		}
		if (event.action === 'remove') {
			return this.removeItem(event.row);
		}

		return;
	}

	protected async addItemToCart(id: number, name: string, count: number, price: number) {
		const response = await this.service.addItemToCart(this.marketId(), { id, count, name, price }, (cartItem, catalogItem, value) =>
			this.updateCartItemPrice(cartItem, catalogItem, value)
		);
		const cartItem = response.items[0]!;
		const cartListItem = response.listItems[0]!;

		const index = this.cartItems().findIndex((item) => item.id === cartItem.id);

		if (index === -1) {
			this.cartItems.update((items) => [cartItem, ...items]);
			this.cartItemsList.update((items) => [cartListItem, ...items]);
		} else {
			this.cartItems()[index]!.count = cartItem.count;
			this.cartItemsList.update((items) => {
				const newItems = items.filter((item) => item.id !== cartListItem.id);
				newItems.splice(index, 0, cartListItem);

				return newItems;
			});
		}

		this.updateCartSum();
	}

	protected async removeItem(row: TableRowConfig<MarketItemsSchema>) {
		await this.service.removeItem(row.id);

		this.cartItems.update((items) => items.filter((item) => item.id !== row.id));
		this.cartItemsList.update((items) => items.filter((item) => item.id !== row.id));

		this.updateCartSum();
	}

	protected async clearCart() {
		await this.service.clearCart(this.marketId());

		this.cartItems.set([]);
		this.cartItemsList.set([this.createCartFinalCostListItem()]);
	}

	protected setCurrentCurrency(currencyId: number) {
		this.storage.setItem('marketsCurrenciesIndex', {
			...this.storage.getItem('marketsCurrenciesIndex'),
			[this.marketId()]: currencyId
		});
		this.currentCurrency.set(this.currencies()[currencyId]!);

		this.updateCartPrices();
	}

	private async updateCartItemPrice(
		cartItem: { id: number; count: number },
		catalogItem: { count: number; price: number },
		value: number
	) {
		await this.service.recountCartItem(cartItem.id, value / catalogItem.count);

		const cartListItem = this.cartItemsList().find((item) => item.id === cartItem.id)!;
		cartListItem.cells.c.index.number = (value / (this.currentCurrency()?.rate ?? 1) / catalogItem.count) * catalogItem.price;

		this.updateCartSum();
	}

	private async updateCartPrices() {
		for (const cartItem of this.cartItems()) {
			const catalogItem = this.catalogItems().find((item) => item.id === cartItem.catalogItemId)!;
			const cartListItem = this.cartItemsList().find((item) => item.id === cartItem.id)!;
			const totalPrice = (catalogItem.price * cartItem.count) / (this.currentCurrency()?.rate ?? 1);

			cartListItem.cells.c.index.number = totalPrice;
		}

		this.updateCartSum();
	}

	private updateCartSum() {
		const lastItem = this.cartItemsList().pop()!;

		lastItem.cells.b.index.number = 0;
		lastItem.cells.c.index.number = 0;

		for (let i = 0; i < this.cartItemsList().length; i++) {
			const item = this.cartItemsList()[i]!;

			lastItem.cells.b.index.number += item.cells.b.index.number;
			lastItem.cells.c.index.number += item.cells.c.index.number;
		}

		this.cartItemsList.update((items) => [...items, lastItem]);
	}

	private createCartFinalCostListItem(): TableRowConfig<MarketCartItemsSchema> {
		return {
			id: -1,
			cells: {
				a: {
					index: { type: 'text', text: 'Итого', isSpecial: true }
				},
				b: {
					index: { type: 'number', number: 0 }
				},
				c: {
					index: { type: 'number', number: 0 }
				},
				d: {
					clear: { type: 'button', text: 'Очистить' }
				}
			}
		};
	}
}
