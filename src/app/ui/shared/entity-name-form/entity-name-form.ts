import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TextInput } from '../../controls/text-input/text-input';
import { ButtonInput } from '../../controls/button-input/button-input';

@Component({
	selector: 'app-entity-create',
	imports: [TextInput, ButtonInput],
	templateUrl: './entity-name-form.html',
	styleUrl: './entity-name-form.css'
})
export class EntityNameForm {
	@Input({ required: true }) public submitText: string = '';

	@Output() public failed = new EventEmitter<string>();
	@Output() public submited = new EventEmitter<string>();

	protected value: string = '';

	protected onSubmit() {
		if (this.value.length === 0) {
			return this.failed.emit('Название не было указано');
		}

		this.submited.emit(this.value);
	}
}
