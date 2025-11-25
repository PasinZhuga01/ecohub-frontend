import { Component, input } from '@angular/core';

@Component({
	selector: 'app-entity-error-wrapper',
	imports: [],
	templateUrl: './entity-error-wrapper.html',
	styleUrl: './entity-error-wrapper.css'
})
export class EntityErrorWrapper {
	public readonly isValid = input.required();
}
