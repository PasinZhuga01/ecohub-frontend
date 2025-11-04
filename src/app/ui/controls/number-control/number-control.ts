import { Component } from '@angular/core';

import { NumberControlConfig } from './number-control.types';
import { numberControlConfigSchema } from './number-control.schemas';

import { BaseControl } from '../base-control/base-control';
import { ControlError } from '../errors';

@Component({
	selector: 'app-number-control',
	imports: [],
	templateUrl: './number-control.html',
	styleUrl: './number-control.css',
	host: {
		'[class.not-stepperable]': '!_configManager.config().isStepperable'
	}
})
export class NumberControl extends BaseControl<number, NumberControlConfig> {
	public constructor() {
		super({ isStepperable: false, step: 1, min: 0, max: 1000000, value: 0 }, numberControlConfigSchema);
	}

	protected _onValueChange({ target }: Event) {
		if (!(target instanceof HTMLInputElement)) {
			throw new ControlError("NumberControl value changer isn't an HTMLInputElement");
		}

		target.value = String(this._updateValue(Number(target.value)));
	}

	protected _onShiftValue(side: -1 | 1) {
		const { value, step } = this._configManager.config();

		this._updateValue(value + step * side);
	}

	private _updateValue(value: number): number {
		this._configManager.set({ value });
		value = this._configManager.config().value;

		this.entered.emit(value);

		return value;
	}
}
