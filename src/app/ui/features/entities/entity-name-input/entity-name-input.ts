import { Component, input, model, output } from '@angular/core';
import { TextControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-entity-name-input',
	imports: [TextControl, ButtonControl],
	templateUrl: './entity-name-input.html',
	styleUrl: './entity-name-input.css'
})
export class EntityNameInput {
	public readonly executeText = input.required<string>();
	public readonly value = model<string>('');

	public readonly executed = output();
}
