module.exports = {
	env: {
		es6: true,
		browser: false,
		node: true,
	},
	extends: ['airbnb/base', 'prettier'],
	plugins: [
    'prettier',
    'import'
	],
	rules: {
		'linebreak-style': 'off', // Don't play nicely with Windows.

		'arrow-parens': 'off', // Incompatible with prettier
		'object-curly-newline': 'off', // Incompatible with prettier
		'no-mixed-operators': 'off', // Incompatible with prettier
		'arrow-body-style': 'off', // Not our taste?
		'function-paren-newline': 'off', // Incompatible with prettier
		'no-plusplus': 'off',
    'space-before-function-paren': 0, // Incompatible with prettier,
    "comma-dangle": ["error", "never"],
    "semi": ["error", "never"],

		'max-len': ['error', 100, 2, { ignoreUrls: true, }], // airbnb is allowing some edge cases

		'no-param-reassign': 'off', // Not our taste?
		"radix": "off", // parseInt, parseFloat radix turned off. Not my taste.

		'prettier/prettier': ['error']
	}
}