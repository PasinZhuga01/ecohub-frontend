import { Component, effect, inject, signal } from '@angular/core';
import { MarketSelectCurrency, MarketCart, MarketCatalog } from '@ui/features/projects/markets';
import { EntityErrorWrapper } from '@ui/features/entities';
import { ButtonControl } from '@ui/controls';
import { MarketService, RouterService } from '@core/services';

import { createMarketSignal } from '../helpers';

@Component({
	selector: 'app-market',
	imports: [EntityErrorWrapper, MarketSelectCurrency, MarketCart, MarketCatalog, ButtonControl],
	templateUrl: './market.html',
	styleUrl: './market.css'
})
export class Market {
	protected readonly _currencyId = signal<number>(-1);

	protected readonly _market = createMarketSignal();
	protected readonly _router = inject(RouterService);
	protected readonly _service = inject(MarketService);

	public constructor() {
		effect(() => this._currencyId.set(this._market().currencyId ?? -1));
	}

	protected _scrollToCart() {
		window.location.hash = '';
		window.location.hash = 'cart-fragment';
	}
}
