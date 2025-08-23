import { IBaseInput } from '../base-input/base-input.types';

export interface ITextInput extends IBaseInput {
	limit: number;
	value: string;
	placeholder: string;
}
