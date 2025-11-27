import { Component, effect, inject } from '@angular/core';
import { CurrencyService } from '@core/services';
import { CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList } from '@ui/features/projects';
import { EntityErrorWrapper } from '@ui/features/entities';

import { createProjectSignal } from '../helpers';

@Component({
	selector: 'app-currencies',
	imports: [CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList, EntityErrorWrapper],
	templateUrl: './currencies.html',
	styleUrl: './currencies.css'
})
export class Currencies {
	protected readonly _project = createProjectSignal();

	private readonly _service = inject(CurrencyService);

	public constructor() {
		effect(() => {
			const project = this._project();

			if (project.isValid) {
				this._service.refreshItems(project.id);
			}
		});
	}
}
