import { Component, Input } from '@angular/core';

import { TableCell, TableCellConfig } from '../table-cell/table-cell';
import { BaseTableItem } from '../base-table-item/base-table-item';
import { TableSchema } from '../table/table';

export type TableRowConfig<T extends TableSchema, K extends keyof T> = { id: number; cells: Record<K, T[K]> };
export type TableRowButtonClickEvent<K extends string | number | symbol> = { cell: TableCellConfig<K>; name: string };

@Component({
	selector: 'app-table-row',
	imports: [TableCell],
	templateUrl: './table-row.html',
	styleUrl: './table-row.css'
})
export class TableRow extends BaseTableItem<TableRowButtonClickEvent<string>, TableCellConfig<string>> {
	@Input({ required: true }) public id: number = -1;
	@Input({ required: true }) public items: Record<string, TableCellConfig<string>> = {};
}
