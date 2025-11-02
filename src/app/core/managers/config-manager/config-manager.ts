import { ConfigSchema } from '@core/types';

import { ConfigManagerError } from './config-manager.errors';

export class ConfigManager<TConfig extends object> {
	private readonly _schema: ConfigSchema<TConfig>;
	private _config: TConfig;

	public constructor(config: TConfig, schema: ConfigSchema<TConfig> = {}) {
		this._config = config;
		this._schema = schema;

		this.set(config, true);
	}

	public get config(): TConfig {
		return this._config;
	}

	public set(config: Partial<TConfig>, isSafeMode: boolean = true) {
		for (const name in config) {
			if (this._schema.validators?.[name]?.safeParse(config[name]).success ?? true) {
				this._config[name] = config[name]!;
			} else if (!isSafeMode) {
				throw new ConfigManagerError(`Invalid config value for field "${name}". Value = "${config[name]}"`);
			}
		}

		if (this._schema.normalize !== undefined) {
			this._config = this._schema.normalize(this._config);
		}

		this._config = { ...this._config };
	}
}
