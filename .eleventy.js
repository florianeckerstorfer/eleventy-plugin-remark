const eleventyRemark = require('./src/eleventyRemark');

module.exports = eleventyConfig => {
  eleventyConfig.setLibrary('md', eleventyRemark);
};
