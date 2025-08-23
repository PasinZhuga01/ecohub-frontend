import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextInput } from '../../controls/text-input/text-input';
import { ButtonInput } from '../../controls/button-input/button-input';

@Component({
	selector: 'app-entity-create',
	imports: [TextInput, ButtonInput],
	templateUrl: './entity-create.html',
	styleUrl: './entity-create.css'
})
export class EntityCreate {
	@Input({ required: true }) public submitText: string = '';

	@Output() public submited = new EventEmitter<string>();

	protected value: string = '';
}
