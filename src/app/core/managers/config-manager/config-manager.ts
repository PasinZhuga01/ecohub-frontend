import { InputSignal, signal, effect, untracked, WritableSignal, Signal } from '@angular/core';
import { ConfigSchema } from '@core/types';

import { ConfigManagerError } from './config-manager.errors';

export class ConfigManager<TConfig extends object, TRequiredKeys extends keyof TConfig = never> {
	private readonly _schema: ConfigSchema<TConfig>;
	private readonly _config: WritableSignal<TConfig>;

	public constructor(
		config: TConfig,
		input: InputSignal<Partial<TConfig>> | InputSignal<Partial<TConfig> & Pick<TConfig, TRequiredKeys>>,
		schema: ConfigSchema<TConfig> = {}
	) {
		this._config = signal(config);
		this._schema = schema;

		this.set(input(), false);

		effect(() => {
			const value = input();
			untracked(() => this.set(value));
		});
	}

	public get config(): Signal<TConfig> {
		return this._config.asReadonly();
	}

	public set(value: Partial<TConfig>, isSafeMode: boolean = true) {
		let config = { ...this._config() };

		for (const name in value) {
			if (this._schema.validators?.[name]?.safeParse(value[name]).success ?? true) {
				config[name] = value[name]!;
			} else if (!isSafeMode) {
				throw new ConfigManagerError(`Invalid config value for field "${name}". Value = "${value[name]}"`);
			}
		}

		if (this._schema.normalize !== undefined) {
			config = this._schema.normalize(config);
		}

		this._config.set(config);
	}
}
