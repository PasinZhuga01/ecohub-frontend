import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SvgIcons } from './services/svg-icons/svg-icons';

@Component({
	selector: 'app-root',
	imports: [MatIconModule],
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
