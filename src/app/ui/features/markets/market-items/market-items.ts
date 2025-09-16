import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableButtonClickEvent, TableConfig, TableSchema } from '@ui/widgets/table/table.types';
import { Table } from '@ui/widgets/table/table';
import { TableRowConfig } from '@ui/widgets/table-row/table-row.types';

import { MarketItemsConfig, MarketItemsSchema, MarketItemsAction } from './market-items.types';

@Component({
	selector: 'app-market-items',
	imports: [Table],
	templateUrl: './market-items.html',
	styleUrl: './market-items.css'
})
export class MarketItems {
	@Output() public executed = new EventEmitter<{ id: number; row: TableRowConfig<MarketItemsSchema>; action: MarketItemsAction }>();

	protected readonly _config: TableConfig<MarketItemsSchema> = {
		headers: { a: 'Название', b: 'Количество', c: 'Цена', d: 'Действия' },
		rows: []
	};

	@Input({ required: true }) public set config(value: MarketItemsConfig) {
		this._config.rows = value.rows;
	}

	protected onExecute(event: TableButtonClickEvent<TableSchema>) {
		this.executed.emit({
			id: event.row.id,
			action: event.name as MarketItemsAction,
			row: event.row as TableRowConfig<MarketItemsSchema>
		});
	}
}
