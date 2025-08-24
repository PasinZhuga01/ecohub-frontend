import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http-service/http-service';

import { Projects as Requests } from '../../../core/http-service/types/requests';
import { Projects as Responses } from '../../../core/http-service/types/responses';
import { MessageBoxObject } from '../../../core/message-box-manager/message-box-manager.types';

@Injectable({
	providedIn: 'root'
})
export class ProjectEditService {
	public constructor(private http: HttpService) {}

	public async rename(id: number, name: string): Promise<MessageBoxObject<'Ошибка' | 'Успех'>> {
		const response = await this.http.patch<Requests.RenameRequest, Responses.RenameResponse>('/projects/rename', { id, name });

		if (!response.success) {
			switch (response.response.code) {
				case 'NAME_TAKEN':
					return { header: 'Ошибка', description: 'Проект с таким названием уже существует' };
			}

			throw new Error(`Received unknown response code = "${response.response.code}"`);
		}

		return { header: 'Успех', description: `Проект успешно переименован в "${response.response.name}"` };
	}
}
