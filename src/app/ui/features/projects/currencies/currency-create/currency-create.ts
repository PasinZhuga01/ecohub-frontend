import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TextControl, ButtonControl, NumberControl } from '@ui/controls';

@Component({
	selector: 'app-currency-create',
	imports: [TextControl, ButtonControl, NumberControl, NgStyle],
	templateUrl: './currency-create.html',
	styleUrl: './currency-create.css'
})
export class CurrencyCreate {
	@Input() public iconSrc: string = '';
	@Input() public widths: Partial<{ icon: string; input: string; button: string }> = {};

	@Output() public failed = new EventEmitter<string>();
	@Output() public iconUploaded = new EventEmitter<void>();
	@Output() public currecyCreated = new EventEmitter<{ name: string; iconSrc: string; rate: number }>();

	protected _name: string = '';
	protected _rate: number = 1;

	protected _onCurrencyCreate() {
		if (this._name.length === 0) {
			return this.failed.emit('Название валюты не было указано');
		}
		if (this.iconSrc.length === 0) {
			return this.failed.emit('Значок не был загружен');
		}

		this.currecyCreated.emit({ name: this._name, iconSrc: this.iconSrc, rate: this._rate });
	}
}
