import { BaseError } from 'ecohub-shared/errors';

export class ConfigManagerError extends BaseError {
	public constructor(message: string) {
		super('ConfigManagerError', message);
	}
}
