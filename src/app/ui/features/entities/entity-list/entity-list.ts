import { Component, input, model, output } from '@angular/core';
import { Table, TableRow, TableCell } from '@ui/widgets/tables';
import { HighlightText } from '@ui/widgets';

import { EntityListItem } from './entity-list.types';

import { EntityNameInput } from '../entity-name-input/entity-name-input';

@Component({
	selector: 'app-entity-list',
	imports: [Table, TableRow, TableCell, HighlightText, EntityNameInput],
	templateUrl: './entity-list.html',
	styleUrl: './entity-list.css'
})
export class EntityList {
	public readonly items = input.required<EntityListItem[]>();
	public readonly header = input.required<string>();
	public readonly value = model('');

	public readonly created = output();
	public readonly opened = output<EntityListItem>();
	public readonly removed = output<EntityListItem>();
}
