const eleventyRemark = require('./src/eleventyRemark');

const defaultEleventyRemarkOptions = {
  plugins: [],
};

module.exports = {
  initArguments: {},
  configFunction: function(eleventyConfig, pluginOptions = {}) {
    const options = Object.assign(
      {},
      defaultEleventyRemarkOptions,
      pluginOptions
    );
    eleventyConfig.setLibrary('md', eleventyRemark(options));
  },
};
