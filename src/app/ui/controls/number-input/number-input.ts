import { Component, Input, signal } from '@angular/core';

import { BaseInput, IBaseInput } from '../base-input/base-input';

export interface INumberInput extends IBaseInput {
	isStepperable: boolean;
	step: number;
	scale: number;
	min: number;
	max: number;
	value: number;
}

@Component({
	selector: 'app-number-input',
	imports: [],
	templateUrl: './number-input.html',
	styleUrl: './number-input.css'
})
export class NumberInput extends BaseInput<number, INumberInput> implements INumberInput {
	@Input() public isStepperable: boolean = false;

	protected _step = signal(1);
	protected _scale = signal(0);
	protected _min = signal(0);
	protected _max = signal(1000000);
	protected _value = signal(this._min());

	@Input() public set step(value: number) {
		if (isFinite(value)) {
			this._step.set(value);
		}
	}

	@Input() public set scale(value: number) {
		if (value >= 0 && value <= 100) {
			this._scale.set(value);
		}
	}

	@Input() public set min(value: number) {
		if (value < this._max()) {
			this._min.set(value);
		}
	}

	@Input() public set max(value: number) {
		if (value > this._min()) {
			this._max.set(value);
		}
	}

	@Input() public set value(value: number) {
		this._value.set(this.validateValue(value));
	}

	@Input() public override set config(value: Partial<INumberInput>) {
		super.config = value;

		if (value.isStepperable !== undefined) {
			this.isStepperable = value.isStepperable;
		}
		if (value.step !== undefined) {
			this.step = value.step;
		}
		if (value.scale !== undefined) {
			this.scale = value.scale;
		}
		if (value.min !== undefined) {
			this.min = value.min;
		}
		if (value.max !== undefined) {
			this.max = value.max;
		}
		if (value.value !== undefined) {
			this.value = value.value;
		}
	}

	protected get stepperableClass(): string {
		return this.isStepperable ? '' : 'not-stepperable';
	}

	protected onValueChange(event: Event) {
		const input = event.target as HTMLInputElement;

		this._value.set(this.validateValue(Number(input.value)));
		this.valueChanged.emit(this._value());
	}

	protected shiftValue(side: -1 | 1) {
		this._value.update((value) => this.validateValue(value + this._step() * side));
	}

	private validateValue(value: number): number {
		if (this._min() > value) {
			return this.validateValue(this._min());
		} else if (this._max() < value) {
			return this.validateValue(this._max());
		}

		return Number(value.toFixed(this._scale()));
	}
}
