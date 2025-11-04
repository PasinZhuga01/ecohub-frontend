import { Directive, Signal, input, output } from '@angular/core';
import { ConfigManager } from '@core/managers';
import { ConfigSchema } from '@core/types';

import { BaseControlConfig } from './base-control.types';

@Directive()
export abstract class BaseControl<TEnterResponse, TConfig extends BaseControlConfig> {
	public readonly configInput = input<Partial<TConfig>>({}, { alias: 'config' });
	public readonly entered = output<TEnterResponse>();

	private readonly _configManager: ConfigManager<TConfig>;

	public constructor(config: TConfig, schema?: ConfigSchema<TConfig>) {
		this._configManager = new ConfigManager(config, this.configInput, schema);
	}

	protected get _config(): Signal<TConfig> {
		return this._configManager.config;
	}

	protected _updateConfig(config: Partial<TConfig>) {
		this._configManager.set(config);
	}
}
