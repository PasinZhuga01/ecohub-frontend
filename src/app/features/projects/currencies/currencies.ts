import { Component, effect, inject } from '@angular/core';
import { CurrencyService } from '@core/services';
import { CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList } from '@ui/features/projects';
import { createParamsSignal } from '@features';

import { currenciesParamsSchema } from './currencies.schemas';

@Component({
	selector: 'app-currencies',
	imports: [CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList],
	templateUrl: './currencies.html',
	styleUrl: './currencies.css'
})
export class Currencies {
	private readonly _params = createParamsSignal(currenciesParamsSchema);
	private readonly _service = inject(CurrencyService);

	public constructor() {
		effect(() => {
			const params = this._params();

			if (params.success) {
				this._service.setProjectId(params.data.id);
			}
		});
	}
}
