import remark from 'remark';
import html from 'remark-html';

function requirePlugins(plugins) {

  if (!Array.isArray(plugins)) {
    throw new Error('plugins option is not an array');
  }

  const requirePlugin = (item) => {
    if (typeof item === 'function') {
      return item;
    } else if (typeof item === 'string') {
      return require(item);
    }

    throw new Error(`plugin has to be a function or a string, ${typeof item} type passed`);
  };

  const list = plugins.map((item) => {
    let options = {};
    let fn;
    if (typeof item === 'object' && item !== null && item.plugin) {
      fn = requirePlugin(item.plugin);
      options = item.options ? item.options : {};
    }
    else {
      fn = requirePlugin(item);
    }

    return [fn, options];
  });

  return list;
}

function eleventyRemark(options) {
  const processor = remark().use(html);
  let plugins = requirePlugins(options.plugins);
  processor.use(plugins);

  return {
    set: () => {},
    render: (str) =>
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
