import { Component, input, output } from '@angular/core';

import { AuthFormError } from './auth-form.errors';

@Component({
	selector: 'app-auth-form',
	imports: [],
	templateUrl: './auth-form.html',
	styleUrl: './auth-form.css'
})
export class AuthForm {
	public readonly header = input.required<string>();
	public readonly description = input.required<string>();

	public readonly errorText = input<string>();

	public readonly submited = output<Record<string, string>>();

	protected onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!(event.target instanceof HTMLFormElement)) {
			throw new AuthFormError('Invalid submit event target. Submit event target must be HTMLFormElement');
		}

		const formData = new FormData(event.target);
		const object: Record<string, string> = {};

		for (const [key, value] of formData.entries()) {
			object[key] = value.toString();
		}

		this.submited.emit(object);
	}
}
