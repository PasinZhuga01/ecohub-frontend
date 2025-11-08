import { Component, input, output } from '@angular/core';

import { BaseControl } from '../base-control/base-control';

@Component({
	selector: 'app-select-control',
	imports: [],
	templateUrl: './select-control.html',
	styleUrl: './select-control.css'
})
export class SelectControl extends BaseControl {
	public readonly selectedIndex = input<number>(0);
	public readonly selected = output<number>();

	protected _updateSelectedIndex({ target }: Event) {
		if (target instanceof HTMLSelectElement) {
			this.selected.emit(target.selectedIndex);
		}
	}
}
