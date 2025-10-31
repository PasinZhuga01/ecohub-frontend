import { ProfilesApi } from 'ecohub-shared/schemas/api';
import { Injectable } from '@angular/core';
import { HttpService, StorageService } from '@core/services';

import { AuthFormType, AuthServiceResult } from './auth.types';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public constructor(private http: HttpService<ProfilesApi>, private storage: StorageService) {}

	public async auth(type: AuthFormType, object: Record<string, string>): Promise<AuthServiceResult> {
		const isRegister = type === 'register';

		if (isRegister && object['password']! !== object['repeatPassword']) {
			return { success: false, errorText: 'Пароли не совпадают' };
		}

		const response = await this.http.send('/profiles/auth', 'POST', {
			isRegister,
			login: object['login']!,
			password: object['password']!
		});

		if (!response.success) {
			switch (response.response.code) {
				case 'INVALID_CREDENTIALS':
					return { success: false, errorText: 'Неверный логин или пароль' };
				case 'LOGIN_TAKEN':
					return { success: false, errorText: 'Логин занят' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		this.storage.setItem('token', response.response.token);

		return { success: true };
	}
}
