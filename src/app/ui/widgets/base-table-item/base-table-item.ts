import { Directive, Output, EventEmitter, computed } from '@angular/core';

@Directive()
export abstract class BaseTableItem<TButtonClickResponse, TItem> {
	@Output() public buttonClicked = new EventEmitter<TButtonClickResponse>();

	protected abstract items: Record<string, TItem>;
	protected itemsKeys = computed(() => Object.keys(this.items).sort());

	protected getItem(key: string): TItem {
		const item = this.items[key];

		if (item === undefined) {
			throw new Error(`Item not found for key: ${key}`);
		}

		return item;
	}
}
