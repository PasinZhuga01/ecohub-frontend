import { Component, Input } from '@angular/core';

import { SelectItem } from './select-input.types';

import { BaseInput } from '../base-input/base-input';
import { IBaseInput } from '../base-input/base-input.types';

@Component({
	selector: 'app-select-input',
	imports: [],
	templateUrl: './select-input.html',
	styleUrl: './select-input.css'
})
export class SelectInput extends BaseInput<SelectItem, IBaseInput> implements IBaseInput {
	@Input({ required: true }) public items: SelectItem[] = [];

	protected onValueChange(event: Event) {
		const input = event.target as HTMLSelectElement;
		const value = this.items[input.selectedIndex]!;

		this.valueChanged.emit(value);
	}
}
