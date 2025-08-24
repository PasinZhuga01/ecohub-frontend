import { Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MarketsService } from './markets.service';

import { EntityNameForm } from '../../../../ui/shared/entity-name-form/entity-name-form';
import { EntityList } from '../../../../ui/shared/entity-list/entity-list';
import { TableRowConfig } from '../../../../ui/widgets/table-row/table-row.types';
import { EntityListExecuteEvent, EntityListSchema } from '../../../../ui/shared/entity-list/entity-list.types';
import { MessageBox } from '../../../../ui/widgets/message-box/message-box';
import { MessageBoxManager } from '../../../../core/message-box-manager/message-box-manager';

@Component({
	selector: 'app-markets',
	imports: [EntityNameForm, EntityList, MessageBox],
	providers: [MessageBoxManager],
	templateUrl: './markets.html',
	styleUrl: './markets.css'
})
export class Markets {
	protected projectId = signal<number>(-1);

	protected items = signal<TableRowConfig<EntityListSchema>[]>([]);
	protected name = signal<string>('');

	public constructor(
		private service: MarketsService,
		private router: Router,
		private route: ActivatedRoute,
		protected messageBox: MessageBoxManager<'Внимание' | 'Ошибка'>
	) {
		this.projectId.set(Number(this.route.snapshot.paramMap.get('id')));
	}

	public async ngOnInit() {
		this.items.set(await this.service.getList(this.projectId()));
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
		const result = await this.service.create(this.projectId(), name);

		if ('header' in result) {
			return this.messageBox.setMessage(result);
		}

		this.items.update((items) => [result, ...items]);
	}

	protected open(id: number) {
		this.router.navigate(['/project', this.projectId(), 'market', id]);
	}

	protected async remove(event: EntityListExecuteEvent) {
		this.messageBox.setMessage({
			header: 'Внимание',
			description: `Вы уверены, что хотите удалить рынок ${event.row.cells.a.index.text}?`,
			onConfirm: async () => {
				if (await this.service.remove(event.id)) {
					this.items.update((items) => items.filter((item) => item.id !== event.id));
				}
			}
		});
	}
}
