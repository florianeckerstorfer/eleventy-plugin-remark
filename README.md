# @fec/eleventy-plugin-remark

[![Badge for Tests (Linux)](https://github.com/florianeckerstorfer/eleventy-plugin-remark/workflows/Tests%20%28Linux%29/badge.svg)](https://github.com/florianeckerstorfer/eleventy-plugin-remark/actions?query=workflow%3A%22Tests+%28Linux%29%22)

> Plugin for [Eleventy](https://www.11ty.io) to process Markdown files with [Remark](https://remark.js.org)

`@fec/eleventy-plugin-remark` is very easy to configure and allows you to use Remark plugins with Eleventy.

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Contributing](#contributing)
4. [License](#license)

## Installation

You need to install `eleventy-plugin-remark` with NPM or Yarn. In addition the plugin has `remark` and `remark-html` as peer dependencies, therefore you need to install them as well

```bash
npm install -D @fec/eleventy-plugin-remark remark remark-html
yarn add --dev @fec/eleventy-plugin-remark remark remark-html
```

## Configuration

To activate `@fec/eleventy-plugin-remark` you call `addPlugin()` on `eleventyConfig`, like this:

```js
// .eleventy.js
const eleventyRemark = require('@fec/eleventy-plugin-remark');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(eleventyRemark);
  return {};
};
```

If you want to add custom Remark plugins, use the `plugins` option.

```js
eleventyConfig.addPlugin(eleventyRemark, {
  plugins: [require('remark-abbr')],
});
```

# Contributing

To contribute to `eleventy-plugin-remark`, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Install dependencies: `npm install`
4. Make your changes (and don't forget to update the tests)
5. Don't forgot to run the tests: `npm test`
6. Commit your changes: `git commit -m '<commit_message>'`
7. Push to the original branch: `git push origin <project_name>/<location>`
8. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

This project is licenses under the [MIT License](LICENSE).
