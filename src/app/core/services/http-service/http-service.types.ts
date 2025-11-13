import { SuccessableObject } from '@core/types';
import { Code } from 'ecohub-shared/http/payloads';

export type HttpResult<T extends object> = SuccessableObject<{ response: T }, { payload: { code: Code } }>;
