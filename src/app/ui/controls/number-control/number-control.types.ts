import { BaseControlConfig } from '../base-control/base-control.types';

export interface NumberControlConfig extends BaseControlConfig {
	isStepperable: boolean;
	step: number;
	min: number;
	max: number;
	value: number;
}
