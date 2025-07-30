module.exports = {
	globDirectory: 'assets/',
	globPatterns: [
		'**/*.{otf,css,js}'
	],
	swDest: './',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: './sw.js'
};