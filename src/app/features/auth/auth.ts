import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthForm } from '@ui/features/auth';

import { AuthFormType } from './auth.types';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-auth',
	imports: [AuthForm],
	templateUrl: './auth.html',
	styleUrl: './auth.css'
})
export class Auth {
	protected _errorTexts = signal<Record<AuthFormType, string>>({ login: '', register: '' });

	public constructor(private readonly _service: AuthService, private readonly _router: Router) {}

	protected _setErrorText(type: AuthFormType, text: string) {
		this._errorTexts.update((object) => ({ ...object, [type]: text }));
	}

	protected async _auth(type: AuthFormType, object: Record<string, string>) {
		const result = await this._service.auth(type, object);

		if (!result.success) {
			return this._setErrorText(type, result.errorText);
		}

		await this._router.navigate(['../']);
		location.reload();
	}
}
