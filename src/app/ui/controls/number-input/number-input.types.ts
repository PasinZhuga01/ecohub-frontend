import { IBaseInput } from '../base-input/base-input.types';

export interface INumberInput extends IBaseInput {
	isStepperable: boolean;
	step: number;
	scale: number;
	min: number;
	max: number;
	value: number;
}
