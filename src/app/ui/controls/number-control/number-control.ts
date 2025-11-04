import { Component } from '@angular/core';

import { NumberControlConfig } from './number-control.types';
import { numberControlConfigSchema } from './number-control.schemas';

import { BaseControl } from '../base-control/base-control';
import { ControlError } from '../errors';

@Component({
	selector: 'app-number-control',
	imports: [],
	templateUrl: './number-control.html',
	styleUrl: './number-control.css'
})
export class NumberControl extends BaseControl<number, NumberControlConfig> {
	public constructor() {
		super({ isStepperable: false, step: 1, min: 0, max: 1000000, value: 0 }, numberControlConfigSchema);
	}

	protected get _CSSClasses(): string {
		return this._config().isStepperable ? '' : 'not-stepperable';
	}

	protected _onValueChange(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) {
			throw new ControlError("NumberControl value changer isn't an HTMLInputElement");
		}

		this._updateValue(Number(event.target.value));
	}

	protected _onShiftValue(side: -1 | 1) {
		const { value, step } = this._config();

		this._updateValue(value + step * side);
	}

	protected _createConfigObject(): NumberControlConfig {
		return { isStepperable: false, step: 1, min: 0, max: 1000000, value: 0 };
	}

	private _updateValue(value: number) {
		this._updateConfig({ value });
		this.entered.emit(value);
	}
}
