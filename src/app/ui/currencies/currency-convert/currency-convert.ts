import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CurrencyType } from './currency-convert.types';

import { SelectInput } from '../../controls/select-input/select-input';
import { NumberInput } from '../../controls/number-input/number-input';
import { ButtonInput } from '../../controls/button-input/button-input';
import { SelectItem } from '../../controls/select-input/select-input.types';

@Component({
	selector: 'app-currency-convert',
	imports: [SelectInput, NumberInput, ButtonInput],
	templateUrl: './currency-convert.html',
	styleUrl: './currency-convert.css'
})
export class CurrencyConvert {
	@Input({ required: true }) public items: SelectItem[] = [];
	@Input() public result: Record<CurrencyType, { count: number; iconSrc: string }> | null = null;

	@Output() public executed = new EventEmitter<Record<CurrencyType, number> & { count: number }>();

	protected selectedItems: Record<CurrencyType, number> = { from: 0, to: 0 };
	protected count: number = 1;
}
