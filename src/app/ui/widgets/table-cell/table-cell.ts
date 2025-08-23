import { Component, Input } from '@angular/core';

import { TableCellItem, TableCellConfig } from './table-cell.types';

import { NumberInput } from '../../controls/number-input/number-input';
import { TextInput } from '../../controls/text-input/text-input';
import { BaseTableItem } from '../base-table-item/base-table-item';

@Component({
	selector: 'app-table-cell',
	imports: [NumberInput, TextInput],
	templateUrl: './table-cell.html',
	styleUrl: './table-cell.css'
})
export class TableCell extends BaseTableItem<string, TableCellItem> {
	@Input({ required: true }) public items: TableCellConfig<string> = {};
}
