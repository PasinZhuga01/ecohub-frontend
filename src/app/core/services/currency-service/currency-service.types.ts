import { CurrenciesApi } from 'ecohub-shared/http/api/projects';
import { Request } from 'ecohub-shared/http/api';

export type CurrencyCreateArgs = Request<CurrenciesApi, '/create'> & { iconSrc: string };
