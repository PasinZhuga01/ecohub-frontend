import z from 'zod';

export const loginSchema = z.object({
	login: z.string().min(1, { message: 'Логин не был введён' }),
	password: z.string().min(1, { message: 'Пароль не был введён' })
});

export const registerSchema = loginSchema
	.extend({
		'repeat-password': z.string()
	})
	.refine((object) => object.password === object['repeat-password'], { message: 'Пароли не совпадают' });
