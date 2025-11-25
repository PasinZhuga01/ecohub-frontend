import { Component, effect, input, output, signal } from '@angular/core';
import { clamp, toFixedNumber } from '@core/utils';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-number-control',
	imports: [],
	templateUrl: './number-control.html',
	styleUrl: './number-control.css',
	host: {
		'[class.not-stepperable]': '!isStepperable()'
	}
})
export class NumberControl extends BaseControl {
	public readonly isStepperable = input(false);
	public readonly step = input(1);
	public readonly min = input(0);
	public readonly max = input(1000000);
	public readonly scale = input(0);
	public readonly value = input(0);

	public readonly inputed = output<number>();

	protected readonly _value = signal(0);

	public constructor() {
		super();

		effect(() => this._value.set(this._validateValue(this.value())));
	}

	protected _validateValue(value: number) {
		return toFixedNumber(clamp(value, this.min(), this.max()), clamp(Math.round(this.scale()), 0, 100));
	}

	protected _onInputValue(target: HTMLInputElement) {
		target.value = String(this._updateValue(Number(target.value)));
	}

	protected _shiftValue(side: -1 | 1) {
		this._updateValue(this._value() + this.step() * side);
	}

	protected _updateValue(value: number) {
		const validValue = this._validateValue(value);

		this._value.set(validValue);
		this.inputed.emit(validValue);

		return validValue;
	}
}
