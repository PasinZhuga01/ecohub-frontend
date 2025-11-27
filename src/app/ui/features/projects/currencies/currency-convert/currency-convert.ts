import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CurrencyService } from '@core/services';
import { NumberControl, SelectControl } from '@ui/controls';

import { CurrencyConvertSelectedItems, CurrencyConvertItemType } from './currency-convert.types';

@Component({
	selector: 'app-currency-convert',
	imports: [NumberControl, SelectControl],
	templateUrl: './currency-convert.html',
	styleUrl: './currency-convert.css'
})
export class CurrencyConvert {
	protected readonly _selectedItems: CurrencyConvertSelectedItems = { from: signal(null), to: signal(null) };

	protected readonly _sum = signal(0);
	protected readonly _result = computed(() => ((this._getItemRate('from') * this._sum()) / this._getItemRate('to')).toFixed(3));

	protected readonly _service = inject(CurrencyService);

	public constructor() {
		effect(() => {
			this._service.items();
			untracked(() => this._refreshSelectedItems());
		});
	}

	protected _selectItem(index: number, type: CurrencyConvertItemType) {
		this._selectedItems[type].set(this._service.items()[index] ?? null);
	}

	private _getItemRate(type: CurrencyConvertItemType) {
		return this._selectedItems[type]()?.rate ?? 1;
	}

	private _refreshSelectedItems() {
		this._selectItem(0, 'from');
		this._selectItem(0, 'to');
	}
}
