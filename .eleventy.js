const eleventyRemark = require('./src/eleventyRemark.js');

const defaultEleventyRemarkOptions = {
  plugins: [],
  enableRehype: true,
};

export default {
  initArguments: {},
  configFunction: (eleventyConfig, pluginOptions = {}) => {
    const options = Object.assign(
      {},
      defaultEleventyRemarkOptions,
      pluginOptions
    );
    eleventyConfig.setLibrary('md', eleventyRemark(options));
  },
};
