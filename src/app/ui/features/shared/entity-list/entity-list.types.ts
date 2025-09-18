import { TableRowConfig } from '@ui/widgets';

export type EntityListSchema = {
	a: {
		index: { type: 'text'; text: string };
	};
	b: {
		index: { type: 'text'; text: string };
	};
	c: {
		open: { type: 'button'; text: 'Открыть' };
		remove: { type: 'button'; text: 'Удалить' };
	};
};

export type EntityListExecuteEvent = { id: number; row: TableRowConfig<EntityListSchema>; action: 'open' | 'remove' };
