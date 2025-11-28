import { Request, Response } from 'ecohub-shared/http/api';
import { CatalogsItemsApi } from 'ecohub-shared/http/api/projects/markets';

export type CatalogItemCreateArgs = Request<CatalogsItemsApi, '/create'> & { currencyId: number };

export type CatalogItemObject = Record<number, Response<CatalogsItemsApi, '/get'>[number]>;
export type CatalogItemCollection = { array: Response<CatalogsItemsApi, '/get'>; object: CatalogItemObject };
