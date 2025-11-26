import { HttpServiceError } from './http-service.errors';

export function rejectFormData<T extends Record<string, string>>(body: T | FormData) {
	if (body instanceof FormData) {
		throw new HttpServiceError('Request body is FormData');
	}

	return body;
}
