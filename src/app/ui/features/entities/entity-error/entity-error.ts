import { Component, computed, input } from '@angular/core';

import { MESSAGES } from './entity-error.constants';

@Component({
	selector: 'app-entity-error',
	imports: [],
	templateUrl: './entity-error.html',
	styleUrl: './entity-error.css'
})
export class EntityError {
	public readonly type = input.required<keyof typeof MESSAGES>();

	protected readonly _message = computed(() => MESSAGES[this.type()]);
}
