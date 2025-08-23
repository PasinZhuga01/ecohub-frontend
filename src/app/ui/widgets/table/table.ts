import { Component, EventEmitter, Input, Output, computed } from '@angular/core';

import { TableRow, TableRowButtonClickEvent, TableRowConfig } from '../table-row/table-row';
import { TableCellConfig } from '../table-cell/table-cell';

export type TableSchema = { [header: string]: TableCellConfig<string> };

export type TableConfig<T extends TableSchema> = { headers: Record<keyof T, string>; rows: TableRowConfig<T, keyof T>[] };
export type TableButtonClickEvent<T extends TableSchema> = TableRowButtonClickEvent<keyof T> & { row: TableRowConfig<T, keyof T> };

@Component({
	selector: 'app-table',
	imports: [TableRow],
	templateUrl: './table.html',
	styleUrl: './table.css'
})
export class Table {
	@Input({ required: true }) public config: TableConfig<TableSchema> = { headers: {}, rows: [] };

	@Output() public buttonClicked = new EventEmitter<TableButtonClickEvent<TableSchema>>();

	protected headersKeys = computed(() => Object.keys(this.config.headers).sort());

	protected getHeader(key: string): string {
		const header = this.config.headers[key];

		if (header === undefined) {
			throw new Error(`Header not found for key: ${key}`);
		}

		return header;
	}
}
