import { Component, effect, inject, signal } from '@angular/core';
import { EntityErrorWrapper } from '@ui/features/entities';
import { RouterService } from '@core/services';

import { createMarketSignal } from '../helpers';
import { MarketSelectCurrency, MarketRename, MarketCatalogItemCreate, MarketCatalog } from '@ui/features/projects/markets';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-market-edit',
	imports: [EntityErrorWrapper, MarketSelectCurrency, MarketRename, MarketCatalogItemCreate, MarketCatalog, ButtonControl],
	templateUrl: './market-edit.html',
	styleUrl: './market-edit.css'
})
export class MarketEdit {
	protected readonly _currencyId = signal(-1);

	protected readonly _market = createMarketSignal();
	protected readonly _router = inject(RouterService);

	public constructor() {
		effect(() => this._currencyId.set(this._market().currencyId ?? -1));
	}

	protected _updateName(name: string) {
		this._market.update((market) => ({ ...market, name }));
	}
}
