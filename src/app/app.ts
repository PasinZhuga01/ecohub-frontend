import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SvgIcons } from '@core/resources';
import { Header, Main, Footer, Sidebar, Content } from '@ui/layout';
import { MessageBox } from '@ui/widgets';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Sidebar, Content, RouterOutlet, MessageBox],
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
