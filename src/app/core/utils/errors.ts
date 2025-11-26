import { BaseError } from 'ecohub-shared/errors';

export class UtilsError extends BaseError {
	public constructor(message: string) {
		super('UtilsError', message);
	}
}
