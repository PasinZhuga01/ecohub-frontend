import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ConfigManager } from '@core/managers';

import { BaseControlConfig } from './base-control.types';

@Directive()
export abstract class BaseControl<TEnterResponse, TConfig extends BaseControlConfig> {
	@Output() public entered = new EventEmitter<TEnterResponse>();

	protected abstract readonly _configManager: ConfigManager<TConfig>;

	public get config(): TConfig {
		return this._configManager.config;
	}

	@Input() public set config(value: Partial<TConfig>) {
		this._configManager.set(value);
	}
}
