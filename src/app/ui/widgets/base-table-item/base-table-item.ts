import { Directive, input, output, computed } from '@angular/core';

@Directive()
export abstract class BaseTableItem<TButtonClickResponse, TItem> {
	public readonly items = input.required<Record<string, TItem>>();
	public readonly buttonClicked = output<TButtonClickResponse>();

	protected readonly _itemsKeys = computed(() => Object.keys(this.items).sort());

	protected _getItem(key: string): TItem {
		const item = this.items()[key];

		if (item === undefined) {
			throw new Error(`Item not found for key: ${key}`);
		}

		return item;
	}
}
