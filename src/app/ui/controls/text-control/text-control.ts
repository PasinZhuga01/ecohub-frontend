import { Component } from '@angular/core';

import { textControlConfigSchema } from './text-control.schemas';
import { TextControlConfig } from './text-control.types';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-text-control',
	imports: [],
	templateUrl: './text-control.html',
	styleUrl: './text-control.css'
})
export class TextControl extends BaseControl<string, TextControlConfig> {
	public constructor() {
		super({ limit: 1_000_000, value: '', placeholder: '' }, textControlConfigSchema);
	}

	protected _onValueChange(value: string) {
		this._updateConfig({ value });
		value = this._config().value;

		this.entered.emit(value);
	}
}
