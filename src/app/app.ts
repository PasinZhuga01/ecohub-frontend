import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ProfileService, ProjectService, SvgIconService } from '@core/services';
import { Header, Main, Footer, Content, Nav, ProfileMenu } from '@ui/layout';
import { MessageBox } from '@ui/widgets';

@Component({
	selector: 'app-root',
	imports: [MatIconModule, Header, Main, Footer, Content, RouterOutlet, MessageBox, Nav, ProfileMenu],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	protected readonly _profile = inject(ProfileService);
	protected readonly _projects = inject(ProjectService);

	public constructor(svgIconService: SvgIconService) {
		svgIconService.register();
	}
}
