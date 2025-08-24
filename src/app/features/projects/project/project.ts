import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-project',
	imports: [MatIcon, RouterLink],
	templateUrl: './project.html',
	styleUrl: './project.css'
})
export class Project {}
