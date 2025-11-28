import { Component, effect, inject, signal } from '@angular/core';
import { EntityErrorWrapper } from '@ui/features/entities';
import { MarketService } from '@core/services';

import { createMarketSignal } from '../helpers';

@Component({
	selector: 'app-market',
	imports: [EntityErrorWrapper],
	templateUrl: './market.html',
	styleUrl: './market.css'
})
export class Market {
	protected readonly _currencyId = signal<number | null>(0);

	protected readonly _market = createMarketSignal();
	protected readonly _service = inject(MarketService);

	public constructor() {
		effect(() => this._currencyId.set(this._market().currencyId));
	}
}
