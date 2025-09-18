import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableConfig, TableButtonClickEvent, TableSchema, TableRowConfig } from '@ui/widgets';

import { EntityListSchema, EntityListExecuteEvent } from './entity-list.types';

@Component({
	selector: 'app-entity-list',
	imports: [Table],
	templateUrl: './entity-list.html',
	styleUrl: './entity-list.css'
})
export class EntityList {
	@Output() public executed = new EventEmitter<EntityListExecuteEvent>();

	protected readonly config: TableConfig<EntityListSchema> = { headers: { a: 'Название', b: 'Дата', c: 'Действия' }, rows: [] };

	@Input({ required: true }) public set items(value: TableRowConfig<EntityListSchema>[]) {
		this.config.rows = value;
	}

	protected onExecute(event: TableButtonClickEvent<TableSchema>) {
		const id = event.row.id;
		const row = event.row as TableRowConfig<EntityListSchema>;
		const action = event.name === 'remove' ? 'remove' : 'open';

		this.executed.emit({ id, row, action });
	}
}
