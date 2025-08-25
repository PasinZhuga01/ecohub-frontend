import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

import { SelectInput } from '../../controls/select-input/select-input';
import { SelectItem } from '../../controls/select-input/select-input.types';
import { ButtonInput } from '../../controls/button-input/button-input';

@Component({
	selector: 'app-market-select-currency',
	imports: [SelectInput, ButtonInput, NgStyle],
	templateUrl: './market-select-currency.html',
	styleUrl: './market-select-currency.css'
})
export class MarketSelectCurrency {
	@Input() public current: { name: string; iconSrc: string } | null = null;
	@Input() public widths: Partial<{ input: string; submit: string }> = {};

	@Output() public submited = new EventEmitter<number>();

	protected selectedItem: number = 0;
	protected _items: SelectItem[] = [];

	@Input({ required: true }) public set items(value: SelectItem[]) {
		this._items = value;
		this.selectedItem = value[0]?.id ?? 0;
	}
}
