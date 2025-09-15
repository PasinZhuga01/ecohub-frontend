import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { SvgIcons } from './core/svg-icons/svg-icons';
import { Header } from './ui/layout/header/header';
import { Main } from './ui/layout/main/main';
import { Footer } from './ui/layout/footer/footer';
import { Sidebar } from './ui/layout/sidebar/sidebar';
import { Content } from './ui/layout/content/content';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Sidebar, Content, RouterOutlet],
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
