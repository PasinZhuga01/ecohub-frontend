import { Component, Input } from '@angular/core';

import { BaseInput } from '../base-input/base-input';

@Component({
	selector: 'app-text-input',
	imports: [],
	templateUrl: './text-input.html',
	styleUrl: './text-input.css'
})
export class TextInput extends BaseInput<string> {
	@Input() public placeholder: string = '';

	protected onValueChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;

		this.valueChanged.emit(value);
	}
}
