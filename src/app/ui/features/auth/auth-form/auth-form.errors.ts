import { BaseError } from 'ecohub-shared/errors';

export class AuthFormError extends BaseError {
	public constructor(message: string) {
		super('AuthFormError', message);
	}
}
