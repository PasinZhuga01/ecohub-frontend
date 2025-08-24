import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from './projects.service';

import { EntityNameForm } from '../../../ui/shared/entity-name-form/entity-name-form';
import { EntityList } from '../../../ui/shared/entity-list/entity-list';
import { TableRowConfig } from '../../../ui/widgets/table-row/table-row.types';
import { EntityListExecuteEvent, EntityListSchema } from '../../../ui/shared/entity-list/entity-list.types';
import { MessageBox } from '../../../ui/widgets/message-box/message-box';
import { MessageBoxManager } from '../../../core/message-box-manager/message-box-manager';

@Component({
	selector: 'app-projects',
	imports: [EntityNameForm, EntityList, MessageBox],
	providers: [MessageBoxManager],
	templateUrl: './projects.html',
	styleUrl: './projects.css'
})
export class Projects implements OnInit {
	protected items = signal<TableRowConfig<EntityListSchema>[]>([]);
	protected name = signal<string>('');

	public constructor(
		private service: ProjectsService,
		private router: Router,
		protected messageBox: MessageBoxManager<'Внимание' | 'Ошибка'>
	) {}

	public async ngOnInit() {
		this.items.set(await this.service.getList());
	}

	protected onCreateError(description: string) {
		this.messageBox.setMessage({ header: 'Ошибка', description });
	}

	protected onListExecute(event: EntityListExecuteEvent) {
		if (event.action === 'open') {
			return this.open(event.id);
		}
		if (event.action === 'remove') {
			return this.remove(event);
		}
	}

	protected async create(name: string) {
		const result = await this.service.create(name);

		if ('header' in result) {
			return this.messageBox.setMessage(result);
		}

		this.items.update((items) => [result, ...items]);
	}

	protected open(id: number) {
		this.router.navigate(['/project', id]);
	}

	protected async remove(event: EntityListExecuteEvent) {
		this.messageBox.setMessage({
			header: 'Внимание',
			description: `Вы уверены, что хотите удалить проект ${event.row.cells.a.index.text}?`,
			onConfirm: async () => {
				if (await this.service.remove(event.id)) {
					this.items.update((items) => items.filter((item) => item.id !== event.id));
				}
			}
		});
	}
}
