import { Component, inject, input, signal } from '@angular/core';
import { MessageBoxService } from '@core/services';
import { TextControl, NumberControl, ButtonControl } from '@ui/controls';
import { MarketCatalogItemCreateService } from './market-catalog-item-create.service';

@Component({
	selector: 'app-market-catalog-item-create',
	imports: [TextControl, NumberControl, ButtonControl],
	templateUrl: './market-catalog-item-create.html',
	styleUrl: './market-catalog-item-create.css'
})
export class MarketCatalogItemCreate {
	public readonly marketId = input.required<number>();
	public readonly currencyId = input.required<number>();

	protected readonly _name = signal('');
	protected readonly _count = signal(1);
	protected readonly _price = signal(1);

	private readonly _service = inject(MarketCatalogItemCreateService);
	private readonly _messageBox = inject(MessageBoxService);

	protected async _create() {
		const result = await this._service.create({
			marketId: this.marketId(),
			currencyId: this.currencyId(),
			name: this._name(),
			count: this._count(),
			price: this._price()
		});

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: result.message });
		}

		this._clear();
	}

	private _clear() {
		this._name.set('');
		this._count.set(1);
		this._price.set(1);
	}
}
