import { SuccessableObject } from '@core/types';
import { codes } from 'ecohub-shared/http/payloads';

export type HttpResult<T extends object> = SuccessableObject<{ response: T }, { payload: { code: keyof typeof codes } }>;
