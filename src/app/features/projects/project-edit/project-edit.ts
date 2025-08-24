import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { ProjectEditService } from './project-edit.service';

import { EntityNameForm } from '../../../ui/shared/entity-name-form/entity-name-form';
import { ButtonInput } from '../../../ui/controls/button-input/button-input';
import { MessageBoxManager } from '../../../core/message-box-manager/message-box-manager';
import { MessageBox } from '../../../ui/widgets/message-box/message-box';

@Component({
	selector: 'app-project-edit',
	imports: [EntityNameForm, ButtonInput, RouterLink, MessageBox],
	providers: [MessageBoxManager],
	templateUrl: './project-edit.html',
	styleUrl: './project-edit.css'
})
export class ProjectEdit {
	public constructor(
		private service: ProjectEditService,
		private route: ActivatedRoute,
		protected messageBox: MessageBoxManager<'Ошибка' | 'Успех'>
	) {}

	protected onError(description: string) {
		this.messageBox.setMessage({ header: 'Ошибка', description });
	}

	protected async rename(name: string) {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		const result = await this.service.rename(id, name);

		this.messageBox.setMessage(result);
	}
}
