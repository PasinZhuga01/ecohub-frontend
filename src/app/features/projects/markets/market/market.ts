import { Component, effect, inject, signal } from '@angular/core';
import { MarketService, RouterService } from '@core/services';
import { MarketSelectCurrency, MarketCart, MarketCatalog } from '@ui/features/projects/markets';
import { EntityError } from '@ui/features/entities';
import { ButtonControl } from '@ui/controls';
import { Separator } from '@ui/widgets';

import { createMarketSignal } from '../helpers';

@Component({
	selector: 'app-market',
	imports: [EntityError, MarketSelectCurrency, MarketCart, MarketCatalog, ButtonControl, Separator],
	templateUrl: './market.html',
	styleUrl: './market.css'
})
export class Market {
	protected readonly _currencyId = signal(-1);

	protected readonly _market = createMarketSignal();
	protected readonly _router = inject(RouterService);
	protected readonly _service = inject(MarketService);

	public constructor() {
		effect(() => this._currencyId.set(this._market()?.currencyId ?? -1));
	}

	protected _scrollToCart() {
		window.location.hash = '';
		window.location.hash = 'cart-fragment';
	}
}
