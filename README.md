# @fec/eleventy-plugin-remark

![Unit tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Unit%20tests/badge.svg)
![Integration tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Integration%20tests/badge.svg)

> [Eleventy](https://www.11ty.io) plugin to process Markdown files with [Remark](https://remark.js.org)

With `@fec/eleventy-plugin-remark` you can transpile the Markdown of your Eleventy site with Remark. You can also use Remark plugins.

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Contributing](#contributing)
4. [Changelog](#changelog)
5. [License](#license)

## Installation

You need to install `eleventy-plugin-remark` with NPM or Yarn.

```bash
npm install -D @fec/eleventy-plugin-remark
yarn add --dev @fec/eleventy-plugin-remark
```

## Configuration

To activate `@fec/eleventy-plugin-remark` you call `addPlugin()` on `eleventyConfig`, like this:

```js
// .eleventy.js
const eleventyRemark = require('@fec/eleventy-plugin-remark');

module.exports = (eleventyConfig) => {
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
      plugin: emoji,
    },
    {
      plugin: 'remark-emoji',
      options: {
        padSpaceAfter: true,
        emoticon: true,
      },
    },
  ],
});
```

### Additional options

#### `enableRehype` (defaults to `true`)

If `true` the plugins `remark-rehype` and `rehype-stringify` are added to the processor. Set `enableRehype` to `false` if you want either not use `remark-rehype` and `rehype-stringify` at all or if you want to call these plugins with custom options. For example, to enable HTML inside your Markdown you need to use `rehype-raw`:

```
eleventyConfig.addPlugin(eleventyRemark, {
  enableRehype: false,
  plugins: [
    {
      plugin: remarkRehype,
      options: { allowDangerousHtml: true }
    },
    rehypeRaw,
    rehypeStringify
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

## Changelog

### Version 2.2.1 (18 February 2021)

- [#60](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/60) Update `.npmignore`
- [#61](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/61) Add Node 15.x to CI test matrix
- [#62](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/62) Update Rollup config: update externals, explictily set default export

### Version 2.2.0 (18 February 2021)

- [#58](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/58) Update dependencies
- [#59](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/59) Add option to enable rehype (defaults to `true` by default)

### Version 2.1.0 (1 December 2020)

- [#55](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/55) Use rehype-stringify instead of remark-html to convert to HTML
- Update dependencies

## Version 2.0.0 (3 October 2020)

- [#35](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/35) Add support for plugin options (by [byoigres](https://github.com/byoigres))
- Update dependencies
- Minimum Node version is now 10.x

### v1.0.2 (2 December 2019)

- Update README and links in package.json

### v1.0.0 (2 December 2019)

- Initial release

## License

This project is licenses under the [MIT License](LICENSE).
