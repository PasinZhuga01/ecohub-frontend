import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { SelectControl, ButtonControl, SelectControlItemConfig } from '@ui/controls';

@Component({
	selector: 'app-market-select-currency',
	imports: [SelectControl, ButtonControl, NgStyle],
	templateUrl: './market-select-currency.html',
	styleUrl: './market-select-currency.css'
})
export class MarketSelectCurrency {
	@Input() public current: { name: string; iconSrc: string } | null = null;
	@Input() public widths: Partial<{ input: string; submit: string }> = {};

	@Output() public submited = new EventEmitter<number>();

	protected selectedItem: number = 0;
	protected _items: SelectControlItemConfig[] = [];

	@Input({ required: true }) public set items(value: SelectControlItemConfig[]) {
		this._items = value;
		this.selectedItem = value[0]?.id ?? 0;
	}
}
