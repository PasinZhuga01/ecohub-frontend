import { Component, Input } from '@angular/core';

import { TableCell, TableCellConfig } from '../table-cell/table-cell';
import { BaseTableItem } from '../base-table-item/base-table-item';

export type TableRowConfig<T extends string> = { id: number; cells: Record<T, TableCellConfig> };
export type TableRowButtonClickEvent = { cell: TableCellConfig; name: string };

@Component({
	selector: 'app-table-row',
	imports: [TableCell],
	templateUrl: './table-row.html',
	styleUrl: './table-row.css'
})
export class TableRow extends BaseTableItem<TableRowButtonClickEvent, TableCellConfig> {
	@Input({ required: true }) public id: number = -1;
	@Input({ required: true }) public items: Record<string, TableCellConfig> = {};
}
