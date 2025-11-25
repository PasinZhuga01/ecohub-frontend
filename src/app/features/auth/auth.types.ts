import { SuccessableObject } from '@core/types';

export type AuthType = 'login' | 'register';
export type AuthResult = SuccessableObject<object, { message: string }>;
