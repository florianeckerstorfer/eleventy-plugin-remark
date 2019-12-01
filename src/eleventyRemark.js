import remark from 'remark';
import html from 'remark-html';

function eleventyRemark(options) {
  const processor = remark().use(html);
  for (let i = 0; i < options.plugins.length; i++) {
    processor.use(options.plugins[i]);
  }

  return {
    set: () => {},
    render: str =>
      new Promise((resolve, reject) => {
        processor.process(str, (err, file) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(String(file));
        });
      }),
  };
}

export default eleventyRemark;
