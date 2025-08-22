import { Directive, Output, EventEmitter, computed } from '@angular/core';

@Directive()
export abstract class BaseTableItem<E, T> {
	@Output() public buttonClicked = new EventEmitter<E>();

	protected abstract items: Record<string, T>;
	protected itemsKeys = computed(() => Object.keys(this.items));

	protected getItem(key: string): T {
		const item = this.items[key];

		if (item === undefined) {
			throw new Error(`Item not found for key: ${key}`);
		}

		return item;
	}
}
