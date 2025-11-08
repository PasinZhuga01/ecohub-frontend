import { codes } from 'ecohub-shared/http/payloads';

export type SuccessResult<T extends object> = { success: true; response: T } | { success: false; response: { code: keyof typeof codes } };
