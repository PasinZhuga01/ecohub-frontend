import { Component, Input } from '@angular/core';

import { SelectControlItem } from './select-control.types';

import { BaseControl } from '../base-control/base-control';
import { baseControlConfig, BaseControlConfig } from '../base-control/base-control.schemas';
import { ControlError } from '../base-control/base-control.errors';

@Component({
	selector: 'app-select-control',
	imports: [],
	templateUrl: './select-control.html',
	styleUrl: './select-control.css'
})
export class SelectControl extends BaseControl<SelectControlItem, typeof baseControlConfig> {
	@Input({ required: true }) public items: SelectControlItem[] = [];

	protected _config: BaseControlConfig = {};
	protected _configSchema: typeof baseControlConfig = baseControlConfig;

	protected onValueChange(event: Event) {
		if (!(event.target instanceof HTMLSelectElement)) {
			throw new ControlError("SelectControl value changer isn't an HTMLSelectElement");
		}

		this.entered.emit(this.items[event.target.selectedIndex]);
	}
}
