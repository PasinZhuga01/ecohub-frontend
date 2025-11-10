import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SvgIconService, ProfileService, ProjectService } from '@core/services';
import { Header, Main, Footer, Sidebar, Content, SidebarItem } from '@ui/layout';
import { MessageBox } from '@ui/widgets';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Sidebar, Content, RouterOutlet, MessageBox, SidebarItem],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly _profile = inject(ProfileService);
	protected readonly _projects = inject(ProjectService);

	public constructor(svgIcon: SvgIconService) {
		svgIcon.registerIcons({
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

		this._profile.refresh();
		this._projects.refreshNavItems();
	}
}
