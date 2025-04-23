const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

	//Markdown overrides to allow for richer markdown commands, hashes, etc.
	let markdownLibrary = markdownIt({
			html: true,
			breaks: true,
			linkify: true
		}).use(markdownItAnchor, {
			permalink: true,
			permalinkClass: "direct-link",
			permalinkSymbol: "#"
		}).use(require('markdown-it-footnote'));
	eleventyConfig.setLibrary("md", markdownLibrary);

    // Add gal tag
    eleventyConfig.addShortcode('gal', (arg) => `<gal>${arg.split("").reverse().join("").replace(" ","&nbsp;")}</gal>`);

	// Copy any media files to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("./src/**/*.jpg");
	eleventyConfig.addPassthroughCopy("./src/**/*.jpeg");
	eleventyConfig.addPassthroughCopy("./src/**/*.png");
	eleventyConfig.addPassthroughCopy("./src/**/*.svg");
	eleventyConfig.addPassthroughCopy("./src/**/*.pdf");
    eleventyConfig.addPassthroughCopy("./src/**/*.ttf");

	//Ignore output directory
	eleventyConfig.ignores.add("_site");

	return {
		markdownTemplateEngine: "njk",
   		htmlTemplateEngine: "njk",
		dir: {
			input: './src',
			output: './_site'
		}
	}

};
