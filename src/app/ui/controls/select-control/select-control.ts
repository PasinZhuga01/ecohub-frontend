import { Component, input } from '@angular/core';

import { SelectControlItemConfig } from './select-control.types';

import { BaseControl } from '../base-control/base-control';
import { BaseControlConfig } from '../base-control/base-control.types';
import { ControlError } from '../errors';

@Component({
	selector: 'app-select-control',
	imports: [],
	templateUrl: './select-control.html',
	styleUrl: './select-control.css'
})
export class SelectControl extends BaseControl<SelectControlItemConfig, BaseControlConfig> {
	public readonly items = input.required<SelectControlItemConfig[]>();

	public constructor() {
		super({});
	}

	protected _onValueChange({ target }: Event) {
		if (!(target instanceof HTMLSelectElement)) {
			throw new ControlError("SelectControl value changer isn't an HTMLSelectElement");
		}

		const item = this.items()[target.selectedIndex];

		if (item === undefined) {
			throw new ControlError('SelectControl selected item is not defined.');
		}

		this.entered.emit(item);
	}
}
