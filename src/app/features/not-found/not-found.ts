import { Component } from '@angular/core';
import { EntityError } from '@ui/features/entities';

@Component({
	selector: 'app-not-found',
	imports: [EntityError],
	templateUrl: './not-found.html',
	styleUrl: './not-found.css'
})
export class NotFound {}
