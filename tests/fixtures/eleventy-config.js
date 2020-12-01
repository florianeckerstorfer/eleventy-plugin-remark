module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(
    require('@fec/eleventy-plugin-remark'),
    { plugins: [ require('remark-emoji'), require('@fec/remark-a11y-emoji') ] }
  );
  return {};
};

