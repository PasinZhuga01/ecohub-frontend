import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { NgStyle } from '@angular/common';

import { TableConfig, TableSchema, TableButtonClickEvent } from './table.types';
import { TableRow } from '../table-row/table-row';

@Component({
	selector: 'app-table',
	imports: [TableRow, NgStyle],
	templateUrl: './table.html',
	styleUrl: './table.css'
})
export class Table {
	@Input({ required: true }) public config: TableConfig<TableSchema> = { headers: {}, rows: [] };
	@Input() public fontSize?: string;

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
