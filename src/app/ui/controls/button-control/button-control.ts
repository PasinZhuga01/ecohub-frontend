import { Component } from '@angular/core';

import { ButtonControlConfig } from './button-control.types';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-button-control',
	imports: [],
	templateUrl: './button-control.html',
	styleUrl: './button-control.css'
})
export class ButtonControl extends BaseControl<void, ButtonControlConfig> {
	public constructor() {
		super({ isHighlighted: true, isSubmit: false, value: 'Выполнить' });
	}
}
