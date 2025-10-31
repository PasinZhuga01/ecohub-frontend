import { BaseControlConfig } from '../base-control/base-control.types';

export interface TextControlConfig extends BaseControlConfig {
	limit: number;
	value: string;
	placeholder: string;
}
