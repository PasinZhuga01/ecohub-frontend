import { Component } from '@angular/core';
import { EntityErrorWrapper } from '@ui/features/entities';

@Component({
	selector: 'app-error',
	imports: [EntityErrorWrapper],
	templateUrl: './error.html',
	styleUrl: './error.css'
})
export class Error {}
