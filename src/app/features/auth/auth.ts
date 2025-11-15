import { Component, inject, signal } from '@angular/core';
import { AuthForm } from '@ui/features/auth';
import { TextControl, ButtonControl } from '@ui/controls';

import { AuthErrorTexts, AuthType } from './auth.types';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-auth',
	imports: [AuthForm, TextControl, ButtonControl],
	templateUrl: './auth.html',
	styleUrl: './auth.css'
})
export class Auth {
	protected readonly _errorTexts: AuthErrorTexts = { login: signal(''), register: signal('') };

	private readonly _service = inject(AuthService);

	protected async _auth(type: AuthType, data: object) {
		const result = await this._service.auth(type, data);

		if (!result.success) {
			this._errorTexts[type].set(result.message);
		}
	}
}
