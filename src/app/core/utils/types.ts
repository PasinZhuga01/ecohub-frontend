import { HttpResult } from '@core/services';
import { SuccessableObject } from '@core/types';

export type ProcessHttpCallbacks<TResponse extends object, TSuccess extends object, TError extends object> = {
	sendRequest: () => Promise<HttpResult<TResponse>>;
	onSuccess: (response: TResponse) => Promise<SuccessableObject<TSuccess, TError>>;
};
