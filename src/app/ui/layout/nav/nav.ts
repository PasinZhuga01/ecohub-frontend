import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, StorageService } from '@core/services';
import { Sidebar, SidebarItem } from '@ui/widgets/sidebars';

@Component({
	selector: 'app-nav',
	imports: [Sidebar, SidebarItem],
	templateUrl: './nav.html',
	styleUrl: './nav.css'
})
export class Nav {
	protected readonly _router = inject(Router);
	protected readonly _storage = inject(StorageService);
	protected readonly _projects = inject(ProjectService);
}
