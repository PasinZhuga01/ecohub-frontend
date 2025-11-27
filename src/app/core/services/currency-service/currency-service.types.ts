import { Request } from 'ecohub-shared/http/api';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';

export type CurrencyCreateArgs = Request<CurrenciesApi, '/create'> & { iconSrc: string };
