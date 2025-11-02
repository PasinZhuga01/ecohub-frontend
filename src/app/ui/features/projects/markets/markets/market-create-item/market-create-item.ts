import { Component, EventEmitter, Output } from '@angular/core';
import { TextControl, NumberControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-market-create-item',
	imports: [TextControl, NumberControl, ButtonControl],
	templateUrl: './market-create-item.html',
	styleUrl: './market-create-item.css'
})
export class MarketCreateItem {
	@Output() public failed = new EventEmitter<string>();
	@Output() public itemCreated = new EventEmitter<{ name: string; count: number; price: number }>();

	protected _name: string = '';
	protected _count: number = 1;
	protected _price: number = 1;

	protected _onItemCreate() {
		if (this._name.length === 0) {
			return this.failed.emit('Название товара не было указано');
		}

		this.itemCreated.emit({ name: this._name, count: this._count, price: this._price });
	}
}
