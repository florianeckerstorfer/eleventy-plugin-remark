# @fec/eleventy-plugin-remark

![Unit tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Unit%20tests/badge.svg)
![Integration tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Integration%20tests/badge.svg)

> Plugin for [Eleventy](https://www.11ty.io) to process Markdown files with [Remark](https://remark.js.org)

With `@fec/eleventy-plugin-remark` you can transpile the Markdown of your Eleventy site with Remark. You can also use Remark plugins.

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

Signatures

- `plugins: [<plugin-function|plugin-name>, ...<plugin-n>]`
- `plugins: [[{ plugin: <plugin> }], ...[{ plugin: <plugin-n>, options: <plugin-options> }]]`

```js
const emoji = require('remark-emoji');

eleventyConfig.addPlugin(eleventyRemark, {
  plugins: [
    emoji,
    require('remark-emoji'),
    'remark-emoji',
    {
      plugin: emoji
    },
    {
      plugin: 'remark-emoji',
      options: {
        padSpaceAfter: true,
        emoticon: true
      }
    }
  ],
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
