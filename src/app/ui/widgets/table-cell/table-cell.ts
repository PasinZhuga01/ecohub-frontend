import { Component, Input } from '@angular/core';

import { INumberInput, NumberInput } from '../../controls/number-input/number-input';
import { ITextInput, TextInput } from '../../controls/text-input/text-input';
import { BaseTableItem } from '../base-table-item/base-table-item';

export type TableCellItem =
	| { type: 'icon'; iconSrc: string }
	| { type: 'number'; number: number }
	| { type: 'number'; number: number; config: Partial<INumberInput>; isEditing?: true }
	| { type: 'text'; text: string }
	| { type: 'text'; text: string; config: Partial<ITextInput>; isEditing?: true }
	| { type: 'button'; text: string };

export type TableCellConfig<T extends string | symbol | number> = Record<T, TableCellItem>;

@Component({
	selector: 'app-table-cell',
	imports: [NumberInput, TextInput],
	templateUrl: './table-cell.html',
	styleUrl: './table-cell.css'
})
export class TableCell extends BaseTableItem<string, TableCellItem> {
	@Input({ required: true }) public items: TableCellConfig<string> = {};
}
