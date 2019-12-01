import eleventyRemark from './src/eleventyRemark';

const defaultEleventyRemarkOptions = {
  plugins: [],
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
