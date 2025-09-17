import { BaseError } from 'ecohub-shared/errors';

export class StorageError extends BaseError {
	public constructor(message: string) {
		super('StorageError', message);
	}
}
