import { Component, Input } from '@angular/core';

import { BaseInput } from '../base-input/base-input';

type SelectItem = { id: number; text: string };

@Component({
	selector: 'app-select-input',
	imports: [],
	templateUrl: './select-input.html',
	styleUrl: './select-input.css'
})
export class SelectInput extends BaseInput<SelectItem> {
	@Input({ required: true }) public items: SelectItem[] = [];

	protected onValueChange(event: Event) {
		const input = event.target as HTMLSelectElement;
		const value = this.items[input.selectedIndex]!;

		this.valueChanged.emit(value);
	}
}
