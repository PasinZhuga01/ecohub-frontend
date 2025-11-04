import { Component, input, output, computed } from '@angular/core';
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
	public readonly config = input.required<TableConfig<TableSchema>>();
	public readonly fontSize = input<string>();

	public readonly buttonClicked = output<TableButtonClickEvent<TableSchema>>();

	protected readonly _headersKeys = computed(() => Object.keys(this.config().headers).sort());

	protected _getHeader(key: string): string {
		const header = this.config().headers[key];

		if (header === undefined) {
			throw new Error(`Header not found for key: ${key}`);
		}

		return header;
	}
}
