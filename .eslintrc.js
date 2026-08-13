module.exports = {
	root: true,
	extends: ['xo', 'prettier'],
	env: {
		node: true,
		jest: true,
	},
	rules: {
		// The repo deliberately uses snake_case identifiers (e.g. ui__resolver, tplContext).
		camelcase: 'off',
	},
	ignorePatterns: [
		'node_modules',
		'coverage',
		'tmp',
		'docs',
		'**/templates',
		'**/template_collections',
	],
};
