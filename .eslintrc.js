module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	// 继承其他 eslint 的配置
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	// 解析器
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	// 规则合集
	plugins: ['@typescript-eslint', 'prettier'],
	// lint 规则
	rules: {
		'prettier/prettier': 'error',
		'no-case-declarations': 'off',
		'no-constant-condition': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	}
};
