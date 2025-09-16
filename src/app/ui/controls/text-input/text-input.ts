import { Component, Input, signal } from '@angular/core';

import { ITextInput } from './text-input.types';
import { BaseInput } from '../base-input/base-input';

@Component({
	selector: 'app-text-input',
	imports: [],
	templateUrl: './text-input.html',
	styleUrl: './text-input.css'
})
export class TextInput extends BaseInput<string, ITextInput> implements ITextInput {
	@Input() public placeholder: string = '';

	protected _limit = signal(1000000);
	protected _value = signal('');

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

	@Input() public override set config(value: Partial<ITextInput>) {
		super.config = value;

		if (value.limit !== undefined) {
			this.limit = value.limit;
		}
		if (value.value !== undefined) {
			this.value = value.value;
		}
		if (value.placeholder !== undefined) {
			this.placeholder = value.placeholder;
		}
	}

	protected onValueChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;

		this.valueChanged.emit(value);
	}
}
