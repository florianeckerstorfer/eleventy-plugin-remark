const remark = require('remark');
const html = require('remark-html');

function eleventyRemark() {
  const processor = remark().use(html);

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

module.exports = eleventyRemark();
