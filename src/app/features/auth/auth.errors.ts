import { BaseError } from 'ecohub-shared/errors';

export class AuthError extends BaseError {
	public constructor(message?: string) {
		super('AuthError', message ?? 'Неизвестная ошибка');
	}
}
