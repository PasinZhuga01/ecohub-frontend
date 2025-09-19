import { Component } from '@angular/core';

import { buttonControlConfig, ButtonControlConfig } from './button-control.schemas';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-button-control',
	imports: [],
	templateUrl: './button-control.html',
	styleUrl: './button-control.css'
})
export class ButtonControl extends BaseControl<void, typeof buttonControlConfig> {
	protected _config: ButtonControlConfig = { isHighlighted: true, isSubmit: false, value: 'Выполнить' };
	protected _configSchema = buttonControlConfig;

	protected get type(): string {
		return this._config.isSubmit ? 'submit' : 'button';
	}

	protected get highlightingClass(): string {
		return this._config.isHighlighted ? '' : 'not-highlighted';
	}
}
