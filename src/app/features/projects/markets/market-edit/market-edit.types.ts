import { CatalogsItems as Responses } from '../../../../core/http-service/types/responses';
import { MarketCatalogItemsEditSchema } from '../../../../ui/markets/market-items/market-items.types';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';

export type CatalogItemsObject = {
	items: Responses.GetResponse;
	listItems: TableRowConfig<MarketCatalogItemsEditSchema>[];
};
