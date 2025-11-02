import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectControl, NumberControl, ButtonControl, SelectControlItemConfig } from '@ui/controls';

import { CurrencyType } from './currency-convert.types';

@Component({
	selector: 'app-currency-convert',
	imports: [SelectControl, NumberControl, ButtonControl],
	templateUrl: './currency-convert.html',
	styleUrl: './currency-convert.css'
})
export class CurrencyConvert {
	@Input() public result: Record<CurrencyType, { count: number; iconSrc: string }> | null = null;

	@Output() public executed = new EventEmitter<Record<CurrencyType, number> & { count: number }>();

	protected selectedItems: Record<CurrencyType, number> = { from: 0, to: 0 };
	protected count: number = 1;

	protected _items: SelectControlItemConfig[] = [];

	@Input({ required: true }) public set items(value: SelectControlItemConfig[]) {
		this._items = value;

		this.selectedItems = { from: value[0]?.id ?? 0, to: value[0]?.id ?? 0 };
	}
}
