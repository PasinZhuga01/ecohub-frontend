import { SelectItem } from '../../../ui/controls/select-input/select-input.types';
import { CurrencyListSchema } from '../../../ui/currencies/currency-list/currency-list.types';
import { TableRowConfig } from '../../../ui/widgets/table-row/table-row.types';

export type CurrencyObject = {
	item: { id: number; iconSrc: string; name: string; rate: number };
	selectItem: SelectItem;
	listItem: TableRowConfig<CurrencyListSchema>;
};
