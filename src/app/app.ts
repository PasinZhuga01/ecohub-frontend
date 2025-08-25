import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';

import { AppService } from './app.service';
import { NavItems } from './app.types';
import { SvgIcons } from './core/svg-icons/svg-icons';
import { Header } from './ui/layout/header/header';
import { Main } from './ui/layout/main/main';
import { Footer } from './ui/layout/footer/footer';
import { Sidebar } from './ui/layout/sidebar/sidebar';
import { Content } from './ui/layout/content/content';
import { SidebarItemConfig } from './ui/layout/sidebar-item/sidebar-item.types';
import { StorageService } from './core/storage-service/storage-service';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Sidebar, Content, RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App implements OnInit {
	protected isNavExpanded = signal<boolean>(true);
	protected isProfileExpanded = signal<boolean>(false);

	protected navItems = signal<NavItems>({ list: [], objects: new Map(), expanded: new Set() });

	protected profileLogin = signal<string | null>(null);
	protected profileItems = signal<SidebarItemConfig[]>([]);

	public constructor(svgIcons: SvgIcons, private service: AppService, private storage: StorageService, protected router: Router) {
		svgIcons.registerIcons({
			change: 'change.svg',
			currency: 'currency.svg',
			email: 'email.svg',
			logout: 'logout.svg',
			market: 'market.svg',
			markets: 'markets.svg',
			nav: 'nav.svg',
			phone: 'phone.svg',
			projects: 'projects.svg',
			telegram: 'telegram.svg',
			user: 'user.svg'
		});
	}

	public async ngOnInit() {
		this.navItems.set(await this.service.getNavItems());
		this.profileLogin.set(await this.service.getUserLogin());

		if (this.profileLogin() !== null) {
			this.profileItems.set([
				{
					id: 0,
					iconName: 'logout',
					isExpandable: false,
					isSpecial: false,
					isVisible: true,
					level: 0,
					text: 'Выйти'
				}
			]);
		}
	}

	protected toggleNavExpand() {
		this.isNavExpanded.update((value) => !value);
	}

	protected toggleProfileExpand() {
		if (this.profileLogin() !== null) {
			this.isProfileExpanded.update((value) => !value);
		}
	}

	protected gotoIndex() {
		this.router.navigate([this.profileLogin() !== null ? '/projects' : '/']);
	}

	protected async logout() {
		this.storage.setItem('token', '');
		this.isProfileExpanded.set(false);

		await this.router.navigate(['../']);

		location.reload();
	}

	protected async onClickNavItem(item: SidebarItemConfig) {
		const object = this.navItems().objects.get(item)!;

		switch (object.type) {
			case 'project':
				await this.router.navigate(['project', item.id]);
				break;
			case 'currencies':
				await this.router.navigate(['project', object.project.id, 'currencies']);
				break;
			case 'markets':
				await this.router.navigate(['project', object.project.id, 'markets']);
				break;
			case 'market':
				await this.router.navigate(['project', object.project.id, 'market', item.id]);
				break;
			case 'show-more':
				await this.router.navigate(['projects']);
				break;
		}

		location.reload();
	}

	protected onExpandNavItem(item: SidebarItemConfig) {
		const navItems = this.navItems();
		const itemObject = navItems.objects.get(item)!;
		const expanded = navItems.expanded;

		const wasExpanded = expanded.has(item);
		if (wasExpanded) {
			expanded.delete(item);
		} else {
			expanded.add(item);
		}

		const isExpanded = !wasExpanded;

		for (const [subItem, subItemObject] of navItems.objects.entries()) {
			if (
				itemObject.type === 'project' &&
				(subItemObject.type === 'currencies' || subItemObject.type === 'markets') &&
				subItemObject.project === item
			) {
				subItem.isVisible = isExpanded;

				if (subItemObject.type === 'markets') {
					if (!isExpanded) {
						if (expanded.has(subItem)) {
							(subItem as any).__wasExpandedBeforeProjectCollapse = true;
						}
						expanded.delete(subItem);

						for (const [marketItem, marketObject] of navItems.objects.entries()) {
							if (marketObject.type === 'market' && marketObject.markets === subItem) {
								marketItem.isVisible = false;
							}
						}
					} else {
						if ((subItem as any).__wasExpandedBeforeProjectCollapse) {
							expanded.add(subItem);
							delete (subItem as any).__wasExpandedBeforeProjectCollapse;

							for (const [marketItem, marketObject] of navItems.objects.entries()) {
								if (marketObject.type === 'market' && marketObject.markets === subItem) {
									marketItem.isVisible = true;
								}
							}
						}
					}
				}
			}

			if (itemObject.type === 'markets' && subItemObject.type === 'market' && subItemObject.markets === item) {
				subItem.isVisible = isExpanded;
			}
		}

		this.navItems.set({
			...navItems,
			expanded: new Set(expanded)
		});
	}
}
