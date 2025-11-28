import { Component, effect, inject, signal } from '@angular/core';
import { EntityError } from '@ui/features/entities';
import { RouterService } from '@core/services';

import { createMarketSignal } from '../helpers';
import { MarketSelectCurrency, MarketRename, MarketCatalogItemCreate, MarketCatalog } from '@ui/features/projects/markets';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-market-edit',
	imports: [EntityError, MarketSelectCurrency, MarketRename, MarketCatalogItemCreate, MarketCatalog, ButtonControl],
	templateUrl: './market-edit.html',
	styleUrl: './market-edit.css'
})
export class MarketEdit {
	protected readonly _currencyId = signal(-1);

	protected readonly _market = createMarketSignal();
	protected readonly _router = inject(RouterService);

	public constructor() {
		effect(() => this._currencyId.set(this._market()?.currencyId ?? -1));
	}

	protected _updateName(name: string) {
		const market = this._market();

		if (market !== null) {
			this._market.set({ ...market, name });
		}
	}
}
