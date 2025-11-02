import { Component, Input } from '@angular/core';
import { ConfigManager } from '@core/managers';

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
	@Input({ required: true }) public items: SelectControlItemConfig[] = [];

	protected readonly _configManager = new ConfigManager<BaseControlConfig>({});

	protected _onValueChange(event: Event) {
		if (!(event.target instanceof HTMLSelectElement)) {
			throw new ControlError("SelectControl value changer isn't an HTMLSelectElement");
		}

		this.entered.emit(this.items[event.target.selectedIndex]);
	}
}
