import { Request, Response } from 'ecohub-shared/http/api';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';

export type CurrencyCreateArgs = Request<CurrenciesApi, '/create'> & { iconSrc: string };

export type CurrenciesObject = Record<number, Response<CurrenciesApi, '/get'>[number]>;
export type CurrencyCollection = { array: Response<CurrenciesApi, '/get'>; object: CurrenciesObject };
