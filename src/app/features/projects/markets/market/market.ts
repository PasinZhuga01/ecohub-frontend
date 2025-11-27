import { Component, inject } from '@angular/core';
import { MarketService } from '@core/services';

import { createMarketSignal } from '../helpers';
import { EntityErrorWrapper } from '@ui/features/entities';
import { MarketSelectCurrency } from '@ui/features/projects/markets';

@Component({
	selector: 'app-market',
	imports: [EntityErrorWrapper, MarketSelectCurrency],
	templateUrl: './market.html',
	styleUrl: './market.css'
})
export class Market {
	protected readonly _market = createMarketSignal();
	protected readonly _service = inject(MarketService);
}
