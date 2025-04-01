import {
	fixupConfigRules,
	fixupPluginRules,
	includeIgnoreFile
} from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import folders from "eslint-plugin-folders";
import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const gitignorePath = path.resolve(dirname, ".gitignore");
const compat = new FlatCompat({
	baseDirectory: dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...fixupConfigRules(
		compat.extends(
			"airbnb",
			"airbnb/hooks",
			"plugin:@typescript-eslint/recommended",
			"plugin:jest/recommended",
			"plugin:jest/style",
			"plugin:testing-library/react",
			"plugin:import/typescript",
			"plugin:unicorn/recommended",
			"prettier"
		)
	),
	includeIgnoreFile(gitignorePath),
	{
		ignores: ["playwright.config.ts"],

		plugins: {
			jest: fixupPluginRules(jest),
			unicorn: fixupPluginRules(unicorn),
			folders,
			"testing-library": fixupPluginRules(testingLibrary),
			"unused-imports": unusedImports
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
				...jest.environments.globals.globals
			},

			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "commonjs",

			parserOptions: {
				project: "tsconfig.json"
			}
		},

		settings: {
			"import/resolver": {
				typescript: {}
			}
		},

		rules: {
			"class-methods-use-this": "off",
			"lines-between-class-members": "off",
			"no-unused-vars": "off",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_"
				}
			],

			"unused-imports/no-unused-imports": "error",

			"react/jsx-filename-extension": [
				"error",
				{
					extensions: [".tsx"]
				}
			],

			"import/extensions": [
				"error",
				"ignorePackages",
				{
					ts: "never",
					tsx: "never"
				}
			],

			"react/function-component-definition": [
				"error",
				{
					namedComponents: "arrow-function",
					unnamedComponents: "arrow-function"
				}
			],

			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["error"],
			"@typescript-eslint/consistent-type-definitions": ["error"],
			"unicorn/prevent-abbreviations": "off",
			"unicorn/no-null": "off",
			"no-shadow": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/prefer-array-flat": "off",
			"unicorn/prefer-array-flat-map": "off",
			"unicorn/prefer-at": "off",
			"unicorn/prefer-set-has": "off",
			"unicorn/prefer-string-replace-all": "off",
			"unicorn/switch-case-braces": "off",
			"unicorn/no-negated-condition": "off",
			"react/require-default-props": "off",
			"unicorn/prefer-object-from-entries": "off",
			"no-lone-blocks": "off",
			curly: ["error", "all"],

			"no-restricted-syntax": [
				"error",
				{
					selector: "ForInStatement",
					message:
						"for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
				},
				{
					selector: "ForOfStatement",
					message:
						"iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
				},
				{
					selector: "LabeledStatement",
					message:
						"Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
				},
				{
					selector: "WithStatement",
					message:
						"`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
				},
				"BinaryExpression[operator='in']"
			],

			"sort-imports": [
				"error",
				{
					ignoreDeclarationSort: true
				}
			],

			"import/order": [
				"error",
				{
					groups: [
						["builtin", "external"],
						"internal",
						["parent", "sibling", "index"],
						"unknown"
					],

					pathGroupsExcludedImportTypes: ["object", "type"],
					"newlines-between": "always-and-inside-groups",

					alphabetize: {
						order: "asc",
						caseInsensitive: true
					},

					warnOnUnassignedImports: true
				}
			],

			"unicorn/no-unused-properties": "error",
			"unicorn/expiring-todo-comments": "off",
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",

			"react/no-unknown-property": [
				"error",
				{
					ignore: ["css"]
				}
			]
		}
	},
	{
		files: ["**/*.test.*", "**/*.spec.*"],

		rules: {
			"import/no-extraneous-dependencies": "off"
		}
	},
	{
		files: ["**/*.test.tsx", "**/*.spec.tsx"],

		rules: {
			"react/jsx-props-no-spreading": "off"
		}
	},
	{
		files: ["**/lib/**/*.tsx", "**/*.ts"],

		rules: {
			"import/prefer-default-export": "off"
		}
	}
];
