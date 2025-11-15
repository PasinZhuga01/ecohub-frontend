import { Code } from 'ecohub-shared/http/payloads';
import { SuccessableObject } from '@core/types';

export type ProfileServiceHttpResult = SuccessableObject<object, { code: Code }>;
