import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonInput } from '@ui/controls/button-input/button-input';

@Component({
	selector: 'app-home',
	imports: [ButtonInput, RouterLink],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {}
