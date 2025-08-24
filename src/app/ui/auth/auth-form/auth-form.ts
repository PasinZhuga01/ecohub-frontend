import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TextInput } from '../../controls/text-input/text-input';
import { ButtonInput } from '../../controls/button-input/button-input';

@Component({
	selector: 'app-auth-form',
	imports: [TextInput, ButtonInput],
	templateUrl: './auth-form.html',
	styleUrl: './auth-form.css'
})
export class AuthForm {
	@Input({ required: true }) public items: { name: string; limit: number; placeholder: string }[] = [];
	@Input({ required: true }) public url: string = '';

	@Input({ required: true }) public header: string = '';
	@Input({ required: true }) public description: string = '';
	@Input({ required: true }) public submitText: string = '';

	@Input() public errorText: string = '';

	@Output() public failed = new EventEmitter<string>();
	@Output() public submited = new EventEmitter<Record<string, string>>();

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const object: Record<string, string> = {};

		for (const [key, value] of formData.entries()) {
			object[key] = value.toString();

			if (object[key].length === 0) {
				const item = this.items.find((item) => item.name === key)!;

				return this.failed.emit(`${item.placeholder} не был введён`);
			}
		}

		this.submited.emit(object);
	}
}
