import { SuccessableObject } from '@core/types';
import { Code } from 'ecohub-shared/http/payloads';

export type ProjectServiceHttpResult = SuccessableObject<object, { code: Code }>;
