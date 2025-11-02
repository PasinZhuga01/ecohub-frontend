import { Component } from '@angular/core';

import { ButtonControlConfig } from './button-control.types';

import { BaseControl } from '../base-control/base-control';
import { ConfigManager } from '@core/managers';

@Component({
	selector: 'app-button-control',
	imports: [],
	templateUrl: './button-control.html',
	styleUrl: './button-control.css'
})
export class ButtonControl extends BaseControl<void, ButtonControlConfig> {
	protected readonly _configManager = new ConfigManager<ButtonControlConfig>({
		isHighlighted: true,
		isSubmit: false,
		value: 'Выполнить'
	});

	protected get _HTMLInputType(): string {
		return this.config.isSubmit ? 'submit' : 'button';
	}

	protected get _CSSClasses(): string {
		return this.config.isHighlighted ? '' : 'not-highlighted';
	}
}
