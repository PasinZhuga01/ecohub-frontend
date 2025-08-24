import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFormType, AuthServiceResult } from './auth.types';

import { HttpService } from '../../core/http-service/http-service';
import { StorageService } from '../../core/storage-service/storage-service';
import { Profiles as Requests } from '../../core/http-service/types/requests';
import { Profiles as Responses } from '../../core/http-service/types/responses';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public constructor(private http: HttpService, private storage: StorageService, private router: Router) {}

	public async auth(type: AuthFormType, object: Record<string, string>): Promise<AuthServiceResult> {
		const isRegister = type === 'register';

		if (isRegister && object['password']! !== object['repeatPassword']) {
			return { success: false, errorText: 'Пароли не совпадают' };
		}

		const response = await this.http.post<Requests.AuthRequest, Responses.AuthResponse>('/profiles/auth', {
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
		this.router.navigate(['/projects']);

		return { success: true };
	}
}
