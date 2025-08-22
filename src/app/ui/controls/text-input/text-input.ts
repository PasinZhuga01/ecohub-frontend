import { Component, Input, signal } from '@angular/core';

import { BaseInput } from '../base-input/base-input';

@Component({
	selector: 'app-text-input',
	imports: [],
	templateUrl: './text-input.html',
	styleUrl: './text-input.css'
})
export class TextInput extends BaseInput<string> {
	@Input() public placeholder: string = '';

	protected _limit = signal<number>(1000000);
	protected _value = signal<string>('');

	@Input() public set limit(value: number) {
		if (isFinite(value) && value >= 0) {
			this._limit.set(value);
		}
	}

	@Input() public set value(value: string) {
		if (value.length <= this._limit()) {
			this._value.set(value);
		}
	}

	protected onValueChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;

		this.valueChanged.emit(value);
	}
}
