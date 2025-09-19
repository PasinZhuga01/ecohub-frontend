import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-home',
	imports: [ButtonControl, RouterLink],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {}
