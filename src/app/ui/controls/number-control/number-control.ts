import { Component } from '@angular/core';
import { ControlError } from '@core/errors';
import { ConfigManager } from '@core/managers';

import { NumberControlConfig } from './number-control.types';
import { numberControlConfigSchema } from './number-control.schemas';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-number-control',
	imports: [],
	templateUrl: './number-control.html',
	styleUrl: './number-control.css'
})
export class NumberControl extends BaseControl<number, NumberControlConfig> {
	protected readonly _configManager = new ConfigManager<NumberControlConfig>(
		{
			isStepperable: false,
			step: 1,
			min: 0,
			max: 1000000,
			value: 0
		},
		numberControlConfigSchema
	);

	protected get CSSClasses(): string {
		return this.config.isStepperable ? '' : 'not-stepperable';
	}

	protected onValueChange(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) {
			throw new ControlError("NumberControl value changer isn't an HTMLInputElement");
		}

		this.config = { value: Number(event.target.value) };
		this.entered.emit(this.config.value);
	}

	protected onShiftValue(side: -1 | 1) {
		const { value, step } = this.config;

		this.config = { value: value + step * side };
		this.entered.emit(this.config.value);
	}
}
