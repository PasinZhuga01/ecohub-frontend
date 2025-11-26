import { inject, Injectable } from '@angular/core';
import { ProfileService } from '@core/services';
import { ProfilesApi, Request } from 'ecohub-shared/http/api';
import { Code } from 'ecohub-shared/http/payloads';

import { loginSchema, registerSchema } from './auth.schemas';
import { AuthResult, AuthType } from './auth.types';
import { createLookup, processFlow, AbortFlowError } from '@core/utils';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly _profile = inject(ProfileService);

	private readonly _getErrorText = createLookup<Code, string>(
		{
			INVALID_CREDENTIALS: 'Неверный логин или пароль',
			LOGIN_TAKEN: 'Аккаунт с указанным логином уже существует'
		},
		'Неизвестная ошибка'
	);

	public async auth(type: AuthType, data: object) {
		return processFlow<Promise<AuthResult>>({
			onSuccess: async () => {
				await this._sendRequest(this._validateRequestBody(type, data));

				return { success: true };
			},
			onError: async (error) => ({ success: false, message: error.message })
		});
	}

	private _validateRequestBody(type: AuthType, data: object) {
		const isRegister = type === 'register';
		const schema = isRegister ? registerSchema : loginSchema;

		const result = schema.safeParse(data);

		if (!result.success) {
			throw new AbortFlowError(result.error.errors[0]?.message ?? this._getErrorText(null));
		}

		return { ...result.data, isRegister };
	}

	private async _sendRequest(body: Request<ProfilesApi, '/auth'>) {
		const result = await this._profile.auth(body);

		if (!result.success) {
			throw new AbortFlowError(this._getErrorText(result.code));
		}
	}
}
