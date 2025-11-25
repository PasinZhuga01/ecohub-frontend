import { HttpResult } from '@core/services';
import { SuccessableObject } from '@core/types';
import { Code } from 'ecohub-shared/http/payloads';

export type ProcessHttpCallbacks<TResponse extends object, TSuccess> = {
	sendRequest: () => Promise<HttpResult<TResponse>>;
	onSuccess: (response: TResponse) => Promise<TSuccess>;
};

export type ProcessHttpWithoutExtraCallbacks<TResponse extends object> = ProcessHttpCallbacks<TResponse, void>;

export type ProccesHttpResult<TSuccess extends object> = SuccessableObject<TSuccess, { code: Code }>;
