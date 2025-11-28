import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { TextControl, NumberControl } from '@ui/controls';
import { Table, TableRow, TableCell } from '@ui/widgets/tables';
import { HighlightText } from '@ui/widgets';
import { CartItemService, CatalogItemService, MessageBoxService } from '@core/services';

@Component({
	selector: 'app-market-catalog',
	imports: [TextControl, Table, TableRow, TableCell, HighlightText, NumberControl],
	templateUrl: './market-catalog.html',
	styleUrl: './market-catalog.css'
})
export class MarketCatalog {
	public readonly isEditMode = input.required<boolean>();

	public readonly marketId = input.required<number>();
	public readonly currencyId = input.required<number>();

	protected readonly _searchName = signal('');

	protected readonly _cart = inject(CartItemService);
	protected readonly _service = inject(CatalogItemService);
	protected readonly _messageBox = inject(MessageBoxService);

	public constructor() {
		effect(() => {
			this._service.refreshItems(
				this.marketId(),
				untracked(() => this.currencyId())
			);
		});

		effect(() => this._service.refreshRatedPrices(this.currencyId()));
	}

	protected _showRemoveConfirm(id: number, name: string) {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: `Вы уверены что хотите удалить товар "${name}"? Отменить это действие будет невозможно`,
			onConfirm: () => this._service.remove(id)
		});
	}
}
