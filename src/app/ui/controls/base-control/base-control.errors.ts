import { BaseError } from 'ecohub-shared/errors';

export class ControlError extends BaseError {
	public constructor(message: string) {
		super('ControlError', message);
	}
}
