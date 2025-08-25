import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFormType } from './auth.types';
import { AuthService } from './auth.service';

import { AuthForm } from '../../ui/auth/auth-form/auth-form';

@Component({
	selector: 'app-auth',
	imports: [AuthForm],
	templateUrl: './auth.html',
	styleUrl: './auth.css'
})
export class Auth {
	protected errorTexts = signal<Record<AuthFormType, string>>({ login: '', register: '' });

	public constructor(private service: AuthService, private router: Router) {}

	protected setErrorText(type: AuthFormType, text: string) {
		this.errorTexts.update((object) => ({ ...object, [type]: text }));
	}

	protected async auth(type: AuthFormType, object: Record<string, string>) {
		const result = await this.service.auth(type, object);

		if (!result.success) {
			return this.setErrorText(type, result.errorText);
		}

		await this.router.navigate(['../']);
		location.reload();
	}
}
