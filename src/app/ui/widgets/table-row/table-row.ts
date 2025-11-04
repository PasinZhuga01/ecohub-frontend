import { Component, input } from '@angular/core';

import { TableRowButtonClickEvent } from './table-row.types';

import { TableCell } from '../table-cell/table-cell';
import { TableCellConfig } from '../table-cell/table-cell.types';
import { BaseTableItem } from '../base-table-item/base-table-item';

@Component({
	selector: 'app-table-row',
	imports: [TableCell],
	templateUrl: './table-row.html',
	styleUrl: './table-row.css'
})
export class TableRow extends BaseTableItem<TableRowButtonClickEvent<string>, TableCellConfig<string>> {
	public readonly id = input.required<number>();
}
