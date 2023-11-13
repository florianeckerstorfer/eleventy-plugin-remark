# @fec/eleventy-plugin-remark

![Unit tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Unit%20tests/badge.svg)
![Integration tests](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/workflows/Integration%20tests/badge.svg)

> [Eleventy](https://www.11ty.io) plugin to process Markdown files with [Remark](https://remark.js.org)

With `@fec/eleventy-plugin-remark` you can transpile the Markdown of your Eleventy site with Remark. You can also use Remark plugins.

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Code of Conduct](#code-of-conduct)
4. [Contributing](#contributing)
5. [Changelog](#changelog)
6. [License](#license)

## Installation

You need to install `eleventy-plugin-remark` with NPM and it requires at least Node 16.x.

```bash
npm install -D @fec/eleventy-plugin-remark
```

> ⚠️ Since v3.0.0 `eleventy-plugin-remark` supports ESM and it should be possible to use recent versions of `remark`. However, please remember that Eleventy does not fully support ESM yet. See the [Eleventy ESM Support project](https://github.com/orgs/11ty/projects/6) for their progress.

If you do not need ESM support yet you can still use `eleventy-plugin-remark` v2.x. Here are a couple of Remark/Rehype packages and the last version that works with Eleventy:

```
remark            ^13.0.0
rehype-stringify   ^8.0.0
remark-rehype      ^8.1.0
remark-html       ^13.0.1
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

### Using Eleventy Data

`eleventy-plugin-remark` passes [Eleventy supplied data](https://www.11ty.dev/docs/data-eleventy-supplied/) to remark. Plugins can use this data in their Markdown processing. For example, the following plugin access the date of the current page:

```js
import { visit } from 'unist-util-visit';

export default function myRemarkPlugin() {
  const eleventy = this.data().eleventy;
  return (tree) => {
    visit(tree, (node) => {
      console.log('date', eleventy.page.date);
    });
  };
}
```

## Code of Conduct

See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)

## Contributing

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

### Version 4.0.0 (13 November 2023)

- [#148](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/148) Update dependencies (by [Porges](https://github.com/Porges))
- [#149](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/149) Execute unit and integration tests on Node 18, 19 and 20
- New minimum Node version is 16.x

### Version 3.1.1 (30 April 2022)

- [#101](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/101) Create processor for each render to allow per-page data

### Version 3.1.0 (29 April 2022)

- [#100](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/100) Pass Eleventy Data to Remark

### Version 3.0.0 (6 January 2022)

- [#87](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/87) Upgrade to latest remark (with support for ESM) (by [j-f1](https://github.com/j-f1))

### Version 2.2.2 (9 November 2021)

- Update dependencies
- Add official support for Node 16.x and Node 17.x

### Version 2.2.1 (18 February 2021)

- [#60](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/60) Update `.npmignore`
- [#61](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/61) Add Node 15.x to CI test matrix
- [#62](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/62) Update Rollup config: update externals, explicitly set default export

### Version 2.2.0 (18 February 2021)

- [#58](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/58) Update dependencies
- [#59](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/59) Add option to enable rehype (defaults to `true`)

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
