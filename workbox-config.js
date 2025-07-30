module.exports = {
	globDirectory: 'RegPoint/',
	globPatterns: [
		'**/*.{otf,css,js,html}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: './sw.js'
};