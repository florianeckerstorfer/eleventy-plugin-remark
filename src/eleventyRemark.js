import remark from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

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

    throw new Error(
      `plugin has to be a function or a string, ${typeof item} type passed`
    );
  };

  const list = plugins.map((item) => {
    let options = {};
    let fn;
    if (typeof item === 'object' && item !== null && item.plugin) {
      fn = requirePlugin(item.plugin);
      options = item.options ? item.options : {};
    } else {
      fn = requirePlugin(item);
    }

    return [fn, options];
  });

  return list;
}

function eleventyRemark(options) {
  const processor = remark();
  const plugins = requirePlugins(options.plugins);
  processor.use(plugins);

  if (options.enableRehype) {
    processor.use(remarkRehype).use(rehypeStringify);
  }

  return {
    set: () => {},
    render: async (str) => {
      const { contents } = await processor.process(str);
      return contents;
    },
  };
}

export default eleventyRemark;
