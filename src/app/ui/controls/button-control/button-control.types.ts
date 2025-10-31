import { BaseControlConfig } from '../base-control/base-control.types';

export interface ButtonControlConfig extends BaseControlConfig {
	isHighlighted: boolean;
	isSubmit: boolean;
	value: string;
}
