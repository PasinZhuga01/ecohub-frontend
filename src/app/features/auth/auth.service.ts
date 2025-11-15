import { inject, Injectable } from '@angular/core';
import { ProfileService } from '@core/services';
import { ProfilesApi, Request } from 'ecohub-shared/http/api';
import { Code } from 'ecohub-shared/http/payloads';

import { loginSchema, registerSchema } from './auth.schemas';
import { AuthResult, AuthType } from './auth.types';
import { AuthError } from './auth.errors';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly _profile = inject(ProfileService);

	public async auth(type: AuthType, data: object): Promise<AuthResult> {
		try {
			await this._sendRequest(this._validateRequestBody(type, data));

			return { success: true };
		} catch (error) {
			if (error instanceof AuthError) {
				return { success: false, message: error.message };
			}

			throw error;
		}
	}

	private _validateRequestBody(type: AuthType, data: object): Request<ProfilesApi, '/auth'> {
		const isRegister = type === 'register';
		const schema = isRegister ? registerSchema : loginSchema;

		const result = schema.safeParse(data);

		if (!result.success) {
			throw new AuthError(result.error.errors[0]?.message);
		}

		return { ...result.data, isRegister };
	}

	private async _sendRequest(body: Request<ProfilesApi, '/auth'>) {
		const result = await this._profile.auth(body);

		if (!result.success) {
			throw new AuthError(this._createErrorText(result.code));
		}
	}

	private _createErrorText(code: Code): string {
		switch (code) {
			case 'INVALID_CREDENTIALS':
				return 'Неверный логин или пароль';
			case 'LOGIN_TAKEN':
				return 'Аккаунт с указанным логином уже существует';
		}

		return 'Неизвестная ошибка';
	}
}
