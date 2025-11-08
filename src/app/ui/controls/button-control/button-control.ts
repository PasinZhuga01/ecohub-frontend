import { Component, input } from '@angular/core';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-button-control',
	imports: [],
	templateUrl: './button-control.html',
	styleUrl: './button-control.css'
})
export class ButtonControl extends BaseControl {
	public readonly isHighlighted = input<boolean>(true);
	public readonly isSubmit = input<boolean>(false);
	public readonly value = input<string>('Выполнить');
}
