import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NumberInput, ButtonInput } from '@ui/controls';

@Component({
	selector: 'app-currency-shift',
	imports: [NumberInput, ButtonInput, NgStyle],
	templateUrl: './currency-shift.html',
	styleUrl: './currency-shift.css'
})
export class CurrencyShift {
	@Input() public widths: Partial<{ input: string; button: string }> = {};
	@Input() public margin?: string;

	@Output() public shifted = new EventEmitter<number>();

	protected value: number = 1;
}
