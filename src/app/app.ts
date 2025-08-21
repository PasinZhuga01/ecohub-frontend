import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SvgIcons } from './core/svg-icons/svg-icons';
import { Header } from './ui/header/header';
import { Main } from './ui/main/main';
import { Footer } from './ui/footer/footer';
import { Sidebar } from './ui/sidebar/sidebar';
import { Content } from './ui/content/content';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Sidebar, Content],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	public constructor(svgIcons: SvgIcons) {
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
}
