import { Code } from 'ecohub-shared/http/payloads';
import { HttpResult } from '@core/services';
import { SuccessableObject } from '@core/types';

export type ProcessHttpCallbacks<TResponse extends object> = {
	sendRequest: () => Promise<HttpResult<TResponse>>;
	onSuccess: (response: TResponse) => Promise<ProcessHttpResult | void> | void;
};

export type ProcessHttpResult = SuccessableObject<object, { code: Code }>;
