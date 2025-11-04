import { Component } from '@angular/core';
import { NumberControl, TextControl } from '@ui/controls';

import { TableCellItem } from './table-cell.types';

import { BaseTableItem } from '../base-table-item/base-table-item';

@Component({
	selector: 'app-table-cell',
	imports: [NumberControl, TextControl],
	templateUrl: './table-cell.html',
	styleUrl: './table-cell.css'
})
export class TableCell extends BaseTableItem<string, TableCellItem> {
	protected _onNumberValueChange(item: { number: number; onChange?: (value: number) => void }, value: number) {
		item.number = value;

		if (item.onChange !== undefined) {
			item.onChange(value);
		}
	}

	protected _onTextValueChange(item: { text: string; onChange?: (value: string) => void }, value: string) {
		item.text = value;

		if (item.onChange !== undefined) {
			item.onChange(value);
		}
	}
}
