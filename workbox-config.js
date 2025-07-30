module.exports = {
	globDirectory: 'assets/',
	globPatterns: [
		'**/*.{otf,css,js}'
	],
	swDest: 'assets/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'sw.js'
};