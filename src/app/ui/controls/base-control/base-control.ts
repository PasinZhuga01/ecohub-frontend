import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ConfigManager } from '@core/managers';

import { BaseControlConfig } from './base-control.types';

@Directive()
export abstract class BaseControl<E, C extends BaseControlConfig> {
	@Output() public entered = new EventEmitter<E>();

	protected abstract readonly _configManager: ConfigManager<C>;

	public get config(): C {
		return this._configManager.config;
	}

	@Input() public set config(value: Partial<C>) {
		this._configManager.set(value);
	}
}
