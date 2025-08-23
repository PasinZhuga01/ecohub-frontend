import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TextInput } from '../../controls/text-input/text-input';
import { ButtonInput } from '../../controls/button-input/button-input';
import { NumberInput } from '../../controls/number-input/number-input';

@Component({
	selector: 'app-currency-create',
	imports: [TextInput, ButtonInput, NumberInput],
	templateUrl: './currency-create.html',
	styleUrl: './currency-create.css'
})
export class CurrencyCreate {
	@Input() public iconSrc: string = '';

	@Output() public failed = new EventEmitter<string>();
	@Output() public iconUploaded = new EventEmitter<void>();
	@Output() public currecyCreated = new EventEmitter<{ name: string; iconSrc: string; rate: number }>();

	protected name: string = '';
	protected rate: number = 1;

	protected onCurrencyCreate() {
		if (this.name.length === 0) {
			return this.failed.emit('Название валюты не было указано');
		}
		if (this.iconSrc.length === 0) {
			return this.failed.emit('Значок не был загружен');
		}

		this.currecyCreated.emit({ name: this.name, iconSrc: this.iconSrc, rate: this.rate });
	}
}
