import { TableRowConfig } from '../../widgets/table-row/table-row.types';

export type MarketItemsConfig =
	| { type: 'cart'; rows: TableRowConfig<MarketCartItemsSchema>[] }
	| { type: 'catalog'; rows: TableRowConfig<MarketCatalogItemsSchema>[] }
	| { type: 'edit'; rows: TableRowConfig<MarketCatalogItemsEditSchema>[] };

export type MarketItemsSchema = MarketCartItemsSchema | MarketCatalogItemsSchema | MarketCatalogItemsEditSchema;
export type MarketItemsAction = 'add' | 'recount' | 'reprice' | 'remove' | 'clear';

export type MarketCartItemsSchema = {
	a: {
		index: { type: 'text'; text: string; isSpecial?: true };
	};
	b: {
		index:
			| { type: 'number'; number: number }
			| {
					type: 'number';
					number: number;
					config: { isStepperable: true; min: number; step: number };
					onChange: (value: number) => void;
					isEditing: true;
			  };
	};
	c: {
		index: { type: 'number'; number: number };
	};
	d: { remove: { type: 'button'; text: 'Удалить' } } | { clear: { type: 'button'; text: 'Очистить' } };
};

export type MarketCatalogItemsSchema = {
	a: {
		index: { type: 'text'; text: string };
	};
	b: {
		index: { type: 'number'; number: number };
	};
	c: {
		index: { type: 'number'; number: number };
	};
	d: {
		add: { type: 'button'; text: 'Добавить в корзину' };
	};
};

export type MarketCatalogItemsEditSchema = {
	a: {
		index: { type: 'text'; text: string };
	};
	b: {
		index: {
			type: 'number';
			number: number;
			config: { isStepperable: true; min: 1 };
			onChange: (value: number) => void;
			isEditing: true;
		};
	};
	c: {
		index: {
			type: 'number';
			number: number;
			config: { isStepperable: true; min: 1 };
			onChange: (value: number) => void;
			isEditing: true;
		};
	};
	d: {
		remove: { type: 'button'; text: 'Удалить' };
	};
};
