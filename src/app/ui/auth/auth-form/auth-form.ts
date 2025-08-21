import { Component, Input } from '@angular/core';

import { TextInput } from '../../controls/text-input/text-input';
import { ButtonInput } from '../../controls/button-input/button-input';

@Component({
	selector: 'app-auth-form',
	imports: [TextInput, ButtonInput],
	templateUrl: './auth-form.html',
	styleUrl: './auth-form.css'
})
export class AuthForm {
	@Input({ required: true }) public items: { name: string; placeholder: string }[] = [];
	@Input({ required: true }) public url: string = '';

	@Input({ required: true }) public header: string = '';
	@Input({ required: true }) public description: string = '';
	@Input({ required: true }) public submitText: string = '';

	@Input() public hasDivider: boolean = false;

	protected get dividerClass(): string {
		return this.hasDivider ? 'has-divider' : '';
	}
}
