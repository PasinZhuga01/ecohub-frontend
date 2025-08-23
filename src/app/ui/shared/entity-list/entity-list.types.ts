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
