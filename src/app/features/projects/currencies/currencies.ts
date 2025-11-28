import { Component, effect, inject } from '@angular/core';
import { CurrencyService } from '@core/services';
import { CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList } from '@ui/features/projects';
import { EntityError } from '@ui/features/entities';

import { createProjectSignal } from '../helpers';
import { Separator } from '@ui/widgets';

@Component({
	selector: 'app-currencies',
	imports: [CurrencyCreate, CurrencyRateShift, CurrencyConvert, CurrencyList, EntityError, Separator],
	templateUrl: './currencies.html',
	styleUrl: './currencies.css'
})
export class Currencies {
	protected readonly _project = createProjectSignal();

	private readonly _service = inject(CurrencyService);

	public constructor() {
		effect(() => {
			const project = this._project();

			if (project !== null) {
				this._service.refreshItems(project.id);
			}
		});
	}
}
