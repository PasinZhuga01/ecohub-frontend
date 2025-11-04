import { Directive, input, output } from '@angular/core';
import { ConfigManager } from '@core/managers';
import { ConfigSchema } from '@core/types';

import { BaseControlConfig } from './base-control.types';

@Directive()
export abstract class BaseControl<TEnterResponse, TConfig extends BaseControlConfig> {
	public readonly config = input<Partial<TConfig>>({}, { alias: 'config' });
	public readonly entered = output<TEnterResponse>();

	protected readonly _configManager: ConfigManager<TConfig>;

	public constructor(config: TConfig, schema?: ConfigSchema<TConfig>) {
		this._configManager = new ConfigManager(config, this.config, schema);
	}
}
