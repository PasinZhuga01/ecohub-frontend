import { Component, input, model } from '@angular/core';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-text-control',
	imports: [],
	templateUrl: './text-control.html',
	styleUrl: './text-control.css'
})
export class TextControl extends BaseControl {
	public readonly limit = input<number>(1_000_000);
	public readonly placeholder = input<string>('');
	public readonly isPassword = input<boolean>(false);

	public readonly value = model<string>('');

	protected _updateValue(target: HTMLInputElement) {
		this.value.set(target.value);
		target.value = String(this.value());
	}
}
