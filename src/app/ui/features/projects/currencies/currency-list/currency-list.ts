import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableConfig, TableButtonClickEvent, TableSchema, TableRowConfig } from '@ui/widgets';

import { CurrencyListSchema } from './currency-list.types';

@Component({
	selector: 'app-currency-list',
	imports: [Table],
	templateUrl: './currency-list.html',
	styleUrl: './currency-list.css'
})
export class CurrencyList {
	@Output() public executed = new EventEmitter<{ id: number; row: TableRowConfig<CurrencyListSchema>; action: 'modify' | 'remove' }>();

	protected readonly _config: TableConfig<CurrencyListSchema> = {
		headers: { a: 'Значок', b: 'Название', c: 'Курс', d: 'Действия' },
		rows: []
	};

	@Input({ required: true }) public set items(value: TableRowConfig<CurrencyListSchema>[]) {
		this._config.rows = value;
	}

	protected _onClick(event: TableButtonClickEvent<TableSchema>) {
		const id = event.row.id;
		const action = event.name === 'remove' ? 'remove' : 'modify';

		this.executed.emit({ id, action, row: event.row as TableRowConfig<CurrencyListSchema> });
	}
}
