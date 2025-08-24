import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http-service/http-service';
import { Projects as Requests } from '../../../core/http-service/types/requests';
import { Projects as Responses } from '../../../core/http-service/types/responses';
import { TableRowConfig } from '../../../ui/widgets/table-row/table-row.types';
import { EntityListSchema } from '../../../ui/shared/entity-list/entity-list.types';
import { MessageBoxObject } from '../../../core/message-box-manager/message-box-manager.types';

@Injectable({
	providedIn: 'root'
})
export class ProjectsService {
	public constructor(private http: HttpService) {}

	public async getList(): Promise<TableRowConfig<EntityListSchema>[]> {
		const response = await this.http.get<{}, Responses.GetPageResponse>('/projects/get_page', {});

		if (response.success) {
			return response.response.map<TableRowConfig<EntityListSchema>>((item) => this.mapItemToRow(item));
		}

		return [];
	}

	public async create(name: string): Promise<TableRowConfig<EntityListSchema> | MessageBoxObject<'Ошибка'>> {
		const response = await this.http.post<Requests.CreateRequest, Responses.CreateResponse>('/projects/create', { name });

		if (!response.success) {
			switch (response.response.code) {
				case 'NAME_TAKEN':
					return { header: 'Ошибка', description: 'Проект с таким названием уже существует' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return this.mapItemToRow(response.response);
	}

	public async remove(id: number): Promise<boolean> {
		return (await this.http.delete<Requests.RemoveRequest, Responses.RemoveResponse>('/projects/remove', { id })).success;
	}

	private mapItemToRow(item: Responses.GetPageResponse[number]): TableRowConfig<EntityListSchema> {
		return {
			id: item.id,
			cells: {
				a: {
					index: { type: 'text', text: item.name }
				},
				b: {
					index: { type: 'text', text: item.interactedAt }
				},
				c: {
					open: { type: 'button', text: 'Открыть' },
					remove: { type: 'button', text: 'Удалить' }
				}
			}
		};
	}
}
