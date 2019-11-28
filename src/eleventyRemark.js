const remark = require('remark');
const html = require('remark-html');

function eleventyRemark(options) {
  const processor = remark().use(html);
  for (let i = 0; i < options.plugins.length; i++) {
    processor.use(options.plugins[i]);
  }

  return {
    set: () => {},
    render: str =>
      new Promise(resolve => {
        processor.process(str, (err, file) => {
          if (err) {
            console.log(err);
            return;
          }
          resolve(String(file));
        });
      }),
  };
}

module.exports = eleventyRemark;
