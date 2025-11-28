import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { CurrencyService, MarketService } from '@core/services';
import { SelectControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-market-select-currency',
	imports: [SelectControl, ButtonControl],
	templateUrl: './market-select-currency.html',
	styleUrl: './market-select-currency.css'
})
export class MarketSelectCurrency {
	public readonly projectId = input.required<number>();
	public readonly marketId = input.required<number>();

	public readonly currencyId = model.required<number | null>();

	protected readonly _selectedIndex = signal(0);
	protected readonly _activeItem = computed(() => this._currencies.items().object[this.currencyId() ?? -1]);

	protected readonly _currencies = inject(CurrencyService);
	protected readonly _service = inject(MarketService);

	public constructor() {
		effect(() => this._currencies.refreshItems(this.projectId()));
	}

	protected async _setCurrency() {
		const currency = this._currencies.items().array[this._selectedIndex()];

		if (currency !== undefined) {
			const response = await this._service.setCurrency(this.marketId(), currency.id);

			if (response.success) {
				this.currencyId.set(response.currencyId);
			}
		}
	}
}
