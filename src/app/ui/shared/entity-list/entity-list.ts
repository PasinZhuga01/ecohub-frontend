import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EntityListSchema } from './entity-list.types';

import { Table } from '../../widgets/table/table';
import { TableConfig, TableButtonClickEvent, TableSchema } from '../../widgets/table/table.types';
import { TableRowConfig } from '../../widgets/table-row/table-row.types';

@Component({
	selector: 'app-entity-list',
	imports: [Table],
	templateUrl: './entity-list.html',
	styleUrl: './entity-list.css'
})
export class EntityList {
	@Output() public clicked = new EventEmitter<{ id: number; action: 'open' | 'remove' }>();

	protected readonly config: TableConfig<EntityListSchema> = {
		headers: { a: 'Название', b: 'Дата', c: 'Действия' },
		rows: []
	};

	@Input({ required: true }) public set items(value: TableRowConfig<EntityListSchema>[]) {
		this.config.rows = value;
	}

	protected onClick(event: TableButtonClickEvent<TableSchema>) {
		const id = event.row.id;
		const action = event.name === 'remove' ? 'remove' : 'open';

		this.clicked.emit({ id, action });
	}
}
