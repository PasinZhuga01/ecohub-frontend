import { inject, Injectable } from '@angular/core';
import { HttpService, ProfileService, ProjectService } from '@core/services';
import { ProfilesApi, Request, Response } from 'ecohub-shared/http/api';

import { loginSchema, registerSchema } from './auth.schemas';
import { AuthResult, AuthType } from './auth.types';
import { AuthError } from './auth.errors';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly _http: HttpService<ProfilesApi> = inject(HttpService);
	private readonly _profile = inject(ProfileService);
	private readonly _projects = inject(ProjectService);

	public async auth(type: AuthType, data: object): Promise<AuthResult> {
		try {
			const body = this._validateRequestBody(type, data);
			const { token } = await this._sendRequest(body);

			this._profile.refresh(token);
			this._projects.refreshNavItems();

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

	private async _sendRequest(body: Request<ProfilesApi, '/auth'>): Promise<Response<ProfilesApi, '/auth'>> {
		const result = await this._http.send('/profiles/auth', 'POST', body);

		if (!result.success) {
			switch (result.payload.code) {
				case 'INVALID_CREDENTIALS':
					throw new AuthError('Неверный логин или пароль');
				case 'LOGIN_TAKEN':
					throw new AuthError('Аккаунт с указанным логином уже существует');
			}

			throw new AuthError();
		}

		return result.response;
	}
}
