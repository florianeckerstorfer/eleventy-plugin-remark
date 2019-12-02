# @fec/eleventy-plugin-remark

> Plugin for [Eleventy](https://www.11ty.io) to process Markdown files with [Remark](https://remark.js.org)

Made by 👨‍💻[Florian Eckerstorfer](https://florian.ec) in beautiful 🎡 Vienna, Europe.

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Contributing](#contributing)
5. [License](#license)

## Prerequisites

- Eleventy
- `remark` and `remark-html`

## Installation

You need to install `eleventy-plugin-remark` with NPM or Yarn. In addition the plugin has `remark` and `remark-html` as peer dependencies, therefore you need to install them as well

```bash
npm install -D @fec/eleventy-plugin-remark remark remark-html
yarn add --dev @fec/eleventy-plugin-remark remark remark-html
```

## Configuration

You need to add `eleventy-plugin-remark` to your Eleventy configuration:

```js
// .eleventy.js
const eleventyRemark = require('@fec/eleventy-plugin-remark');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(eleventyRemark);
  return {};
};
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

Alternatively see the GitHub documentation on creating a pull request.

## License

This project is licenses under the [MIT License](LICENSE).
