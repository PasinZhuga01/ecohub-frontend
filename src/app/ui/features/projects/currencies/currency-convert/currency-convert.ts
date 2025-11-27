import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CurrencyService } from '@core/services';
import { copyObjectIfDefined } from '@core/utils';
import { NumberControl, SelectControl } from '@ui/controls';

@Component({
	selector: 'app-currency-convert',
	imports: [NumberControl, SelectControl],
	templateUrl: './currency-convert.html',
	styleUrl: './currency-convert.css'
})
export class CurrencyConvert {
	protected readonly _selectedIndexes = { from: signal(0), to: signal(0) };
	protected readonly _selectedItems = {
		from: computed(() => copyObjectIfDefined(this._service.items()[this._selectedIndexes.from()])),
		to: computed(() => copyObjectIfDefined(this._service.items()[this._selectedIndexes.to()]))
	};

	protected readonly _sum = signal(0);
	protected readonly _result = computed(() => {
		const fromItemRate = this._selectedItems.from()?.rate;
		const toItemRate = this._selectedItems.to()?.rate;

		if (fromItemRate === undefined || toItemRate === undefined) {
			return null;
		}

		return ((fromItemRate * this._sum()) / toItemRate).toFixed(2);
	});

	protected readonly _service = inject(CurrencyService);

	private readonly _countItems = computed(() => this._service.items().length);

	public constructor() {
		effect(() => {
			const lastIndex = this._countItems() - 1;

			untracked(() => {
				this._selectedIndexes.from.set(this._selectedIndexes.from() === 0 ? lastIndex : 0);
				this._selectedIndexes.to.set(this._selectedIndexes.to() === 0 ? lastIndex : 0);
			});
		});
	}
}
