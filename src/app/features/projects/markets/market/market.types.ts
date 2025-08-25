import { CatalogsItems as CatalogsItemsResponses, CartsItems as CartsItemsResponses } from '../../../../core/http-service/types/responses';
import { MarketCartItemsSchema, MarketCatalogItemsSchema } from '../../../../ui/markets/market-items/market-items.types';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';

export type CatalogItemsObject = {
	items: CatalogsItemsResponses.GetResponse;
	listItems: TableRowConfig<MarketCatalogItemsSchema>[];
};

export type CartItemsObject = {
	items: CartsItemsResponses.GetResponse;
	listItems: TableRowConfig<MarketCartItemsSchema>[];
};
