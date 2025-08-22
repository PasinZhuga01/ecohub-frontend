import { Component, EventEmitter, Input, Output, computed } from '@angular/core';

import { TableRow, TableRowButtonClickEvent, TableRowConfig } from '../table-row/table-row';

export type TableConfig<T extends string> = { headers: Record<T, string>; rows: TableRowConfig<T>[] };
export type TableButtonClickEvent<T extends string> = TableRowButtonClickEvent & { row: TableRowConfig<T> };

@Component({
	selector: 'app-table',
	imports: [TableRow],
	templateUrl: './table.html',
	styleUrl: './table.css'
})
export class Table {
	@Input({ required: true }) public config: TableConfig<string> = { headers: {}, rows: [] };

	@Output() public buttonClicked = new EventEmitter<TableButtonClickEvent<string>>();

	protected headersKeys = computed(() => Object.keys(this.config.headers));

	protected getHeader(key: string): string {
		const header = this.config.headers[key];

		if (header === undefined) {
			throw new Error(`Header not found for key: ${key}`);
		}

		return header;
	}
}
