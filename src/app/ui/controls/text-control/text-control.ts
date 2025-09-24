import { Component } from '@angular/core';

import { textControlConfig } from './text-control.schemas';
import { TextControlConfig } from './text-control.types';

import { BaseControl } from '../base-control/base-control';
import { ControlError } from '../base-control/base-control.errors';

@Component({
	selector: 'app-text-control',
	imports: [],
	templateUrl: './text-control.html',
	styleUrl: './text-control.css'
})
export class TextControl extends BaseControl<string, typeof textControlConfig> {
	protected _config: TextControlConfig = { limit: 1_000_000, value: '', placeholder: '' };
	protected _configSchema: typeof textControlConfig = textControlConfig;

	protected onValueChange(event: Event) {
		if (!(event.target instanceof HTMLInputElement)) {
			throw new ControlError("SelectControl value changer isn't an HTMLSelectElement");
		}

		this.entered.emit(event.target.value);
	}
}
