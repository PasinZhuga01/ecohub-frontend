import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'app-table-cell',
	imports: [NgTemplateOutlet],
	templateUrl: './table-cell.html',
	styleUrl: './table-cell.css'
})
export class TableCell {
	public readonly isHeader = input(false);
}
