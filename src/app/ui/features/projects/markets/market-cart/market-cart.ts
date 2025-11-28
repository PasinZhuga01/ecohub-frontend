import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CartItemService, CatalogItemService, MessageBoxService } from '@core/services';
import { TextControl, NumberControl } from '@ui/controls';
import { Table, TableCell, TableRow } from '@ui/widgets/tables';
import { HighlightText } from '@ui/widgets';

import { MarketCartItem } from './market-cart.types';

@Component({
	selector: 'app-market-cart',
	imports: [TextControl, Table, TableRow, TableCell, NumberControl, HighlightText],
	templateUrl: './market-cart.html',
	styleUrl: './market-cart.css'
})
export class MarketCart {
	public readonly marketId = input.required<number>();

	protected readonly _searchName = signal('');
	protected readonly _view = computed(() => {
		const total = { count: 0, price: 0 };
		const items: MarketCartItem[] = [];

		const searchName = this._searchName();

		for (const item of this._service.items()) {
			const catalogItem = this._catalog.items().object[item.catalogItemId];

			if (catalogItem !== undefined && catalogItem.name.toLowerCase().includes(searchName.toLowerCase())) {
				const price = (this._catalog.ratedPrices()[catalogItem.id] ?? catalogItem.price) * item.count;

				total.count += catalogItem.count * item.count;
				total.price += price;

				items.push({ id: item.id, step: catalogItem.count, name: catalogItem.name, count: catalogItem.count * item.count, price });
			}
		}

		return { items, total };
	});

	protected readonly _catalog = inject(CatalogItemService);
	protected readonly _service = inject(CartItemService);

	private readonly _messageBox = inject(MessageBoxService);

	public constructor() {
		effect(() => this._service.refreshItems(this.marketId()));
	}

	protected _showClearConfirm() {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: 'Вы уверены что хотите очистить всю корзину? Отменить это действие будет невозможно',
			onConfirm: () => this._service.clear(this.marketId())
		});
	}
}
