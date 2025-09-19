import { z } from 'zod';
import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ObjectValidationService } from '@core/services';

import { baseControlConfig } from './base-control.schemas';

@Directive()
export abstract class BaseControl<E, S extends typeof baseControlConfig | z.ZodEffects<typeof baseControlConfig>> implements OnInit {
	@Output() public entered = new EventEmitter<E>();

	protected abstract _config: z.input<S>;
	protected abstract _configSchema: S;

	public constructor(protected objectValidator: ObjectValidationService) {}

	@Input() public set config(value: Partial<z.input<S>>) {
		const schema = this._configSchema instanceof z.ZodObject ? this._configSchema : this._configSchema.innerType();
		const config = { ...this._config, ...this.objectValidator.filterValid(value, schema) };

		this._config = this._configSchema instanceof z.ZodEffects ? this._configSchema.parse(config) : config;
	}

	public ngOnInit() {
		this._config = this._configSchema.parse(this._config);
	}
}
