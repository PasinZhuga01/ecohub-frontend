import { BaseError } from 'ecohub-shared/errors';

export class HttpServiceError extends BaseError {
	public constructor(message: string) {
		super('HttpServiceError', message);
	}
}
