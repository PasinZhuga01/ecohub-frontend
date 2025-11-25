import { Component, input, model } from '@angular/core';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-text-control',
	imports: [],
	templateUrl: './text-control.html',
	styleUrl: './text-control.css'
})
export class TextControl extends BaseControl {
	public readonly limit = input(1_000_000);
	public readonly placeholder = input('');
	public readonly isPassword = input(false);

	public readonly value = model('');

	protected _updateValue(target: HTMLInputElement) {
		this.value.set(target.value);
		target.value = String(this.value());
	}
}
