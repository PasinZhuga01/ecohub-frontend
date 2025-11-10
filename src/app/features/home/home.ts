import { Component } from '@angular/core';
import { ButtonControl } from '@ui/controls';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [ButtonControl, RouterLink],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {}
