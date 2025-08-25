import { Injectable } from '@angular/core';

import { HttpService } from './core/http-service/http-service';

import { Projects as ProjectsRequests } from './core/http-service/types/requests';
import { Profiles as ProfilesResponses, Projects as ProjectsResponses } from './core/http-service/types/responses';

import env from './env';
import { NavItems } from './app.types';
import { SidebarItemConfig } from './ui/layout/sidebar-item/sidebar-item.types';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	public constructor(private http: HttpService) {}

	public async getNavItems(): Promise<NavItems> {
		const response = await this.http.get<ProjectsRequests.GetNavRequest, ProjectsResponses.GetNavResponse>('/projects/get_nav', {
			maxCount: env.maxCountNavItems
		});

		if (response.success) {
			const list: NavItems['list'] = [];
			const objects: NavItems['objects'] = new Map();
			const expanded: NavItems['expanded'] = new Set();

			for (const project of response.response) {
				const projectItem: SidebarItemConfig = {
					id: project.id,
					iconName: 'projects',
					isExpandable: true,
					isSpecial: false,
					isVisible: true,
					level: 0,
					text: project.name
				};

				const currenciesItem: SidebarItemConfig = {
					id: project.id,
					isSpecial: false,
					isExpandable: false,
					isVisible: false,
					level: 1,
					text: 'Валюты',
					iconName: 'currency'
				};

				const marketsItem: SidebarItemConfig = {
					id: project.id,
					isSpecial: false,
					isVisible: false,
					level: 1,
					text: 'Маркеты',
					iconName: 'markets',
					isExpandable: true
				};

				list.push(projectItem);
				list.push(currenciesItem);
				list.push(marketsItem);

				objects.set(projectItem, { type: 'project' });
				objects.set(currenciesItem, { type: 'currencies', project: projectItem });
				objects.set(marketsItem, { type: 'markets', project: projectItem });

				expanded.add(currenciesItem);
				expanded.add(marketsItem);

				for (const market of project.markets) {
					const marketItem: SidebarItemConfig = {
						id: market.id,
						iconName: 'market',
						isExpandable: false,
						isSpecial: false,
						isVisible: false,
						level: 2,
						text: market.name
					};

					list.push(marketItem);
					objects.set(marketItem, { type: 'market', project: projectItem, markets: marketsItem });
					expanded.add(marketItem);
				}
			}

			const showMoreItem: SidebarItemConfig = {
				id: -1,
				isSpecial: true,
				isVisible: true,
				level: 0,
				text: 'показать все...'
			};

			list.push(showMoreItem);
			objects.set(showMoreItem, { type: 'show-more' });

			return { list, objects, expanded };
		}

		return { list: [], objects: new Map(), expanded: new Set() };
	}

	public async getUserLogin() {
		const response = await this.http.get<{}, ProfilesResponses.GetResponse>('/profiles/get', {});

		return response.success ? response.response.login : null;
	}
}
