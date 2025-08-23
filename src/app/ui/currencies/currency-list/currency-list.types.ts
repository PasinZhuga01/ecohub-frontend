export type CurrencyListSchema = {
	a: {
		index: { type: 'icon'; iconSrc: string };
	};
	b: {
		index: { type: 'text'; text: string };
	};
	c: {
		index: { type: 'number'; number: number; config: { isStepperable: true; min: 1 }; isEditing?: true };
	};
	d: {
		modify: { type: 'button'; text: 'Изменить' };
		remove: { type: 'button'; text: 'Удалить' };
	};
};
