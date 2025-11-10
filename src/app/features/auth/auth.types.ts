import { WritableSignal } from '@angular/core';
import { SuccessableObject } from '@core/types';

export type AuthType = 'login' | 'register';
export type AuthErrorTexts = Record<AuthType, WritableSignal<string>>;
export type AuthResult = SuccessableObject<object, { message: string }>;
