import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularParser from '@angular-eslint/template-parser';
import globals from 'globals';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,mts}'],
		ignores: ['**/*.spec.ts'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'@angular-eslint': angular,
			import: importPlugin
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2016,
				project: './tsconfig.app.json',
				tsconfigRootDir: __dirname
			},
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'import/order': [
				'error',
				{
					groups: [
						'builtin', // Node.js modules: fs, path
						'external', // npm packages: express, uuid
						'internal', // aliases: @app
						'index', // ./ (index.ts)
						'sibling', // ./file.ts
						'parent' // ../file.ts, ../../file.ts
					],
					pathGroups: [
						{ pattern: './**', group: 'sibling' },
						{ pattern: '../*', group: 'parent' }
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'ignore'
					}
				}
			]
		}
	},
	{
		files: ['eslint-config/index.mts'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off'
		}
	},
	{
		files: ['**/*.html'],
		plugins: {
			'@angular-eslint/template': angularTemplate
		},
		languageOptions: {
			parser: angularParser
		},
		rules: {
			'@angular-eslint/template/banana-in-box': 'error',
			'@angular-eslint/template/no-negated-async': 'error',
			'@angular-eslint/template/conditional-complexity': ['error', { maxComplexity: 3 }],
			'@angular-eslint/template/alt-text': 'error',
			'@angular-eslint/template/no-inline-styles': 'error',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	}
);
