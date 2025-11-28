import { Component, inject } from '@angular/core';
import { RouterService } from '@core/services';
import { MatIcon } from '@angular/material/icon';
import { EntityError } from '@ui/features/entities';

import { createProjectSignal } from '../helpers';

@Component({
	selector: 'app-project',
	imports: [MatIcon, EntityError],
	templateUrl: './project.html',
	styleUrl: './project.css'
})
export class Project {
	protected readonly _project = createProjectSignal();
	protected readonly _router = inject(RouterService);
}
