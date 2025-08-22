import { Component, Input } from '@angular/core';

import { BaseInput } from '../base-input/base-input';

@Component({
	selector: 'app-select-input',
	imports: [],
	templateUrl: './select-input.html',
	styleUrl: './select-input.css'
})
export class SelectInput extends BaseInput<number> {
	@Input({ required: true }) public items: { text: string; identifier: number }[] = [];

	protected onValueChange(event: Event) {
		const input = event.target as HTMLSelectElement;
		const value = this.items[input.selectedIndex]!.identifier;

		this.valueChanged.emit(value);
	}
}
