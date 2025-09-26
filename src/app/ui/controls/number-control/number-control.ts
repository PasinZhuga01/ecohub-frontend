import { Component } from '@angular/core';
import { ControlError } from '@core/errors';

import { numberControlConfig } from './number-control.schemas';
import { NumberControlConfig } from './number-control.types';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-number-control',
	imports: [],
	templateUrl: './number-control.html',
	styleUrl: './number-control.css'
})
export class NumberControl extends BaseControl<number, typeof numberControlConfig> {
	protected _config: NumberControlConfig = { isStepperable: false, step: 1, scale: 0, min: 0, max: 1000000, value: 0 };
	protected _configSchema: typeof numberControlConfig = numberControlConfig;

	protected get CSSClasses(): string {
		return this._config.isStepperable ? '' : 'not-stepperable';
	}

	protected onValueChange(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) {
			throw new ControlError("NumberControl value changer isn't an HTMLInputElement");
		}

		this.config = { value: Number(event.target.value) };
		this.entered.emit(this._config.value);
	}

	protected onShiftValue(side: -1 | 1) {
		const { value, step } = this._config;

		this.config = { value: value + step * side };
		this.entered.emit(this._config.value);
	}
}
