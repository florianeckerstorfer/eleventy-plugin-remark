async function requirePlugins(plugins) {
  if (!Array.isArray(plugins)) {
    throw new Error('plugins option is not an array');
  }

  const requirePlugin = async (item) => {
    if (typeof item === 'function' || item instanceof Promise) {
      return item;
    } else if (typeof item === 'string') {
      return import(item).then((m) => m.default);
    }

    throw new Error(
      `plugin has to be a function or a string, ${typeof item} type passed`
    );
  };

  const list = plugins.map(async (item) => {
    let options = {};
    let fn;
    if (typeof item === 'object' && item !== null && item.plugin) {
      fn = await requirePlugin(item.plugin);
      options = item.options ? item.options : {};
    } else {
      fn = await requirePlugin(item);
    }

    return [fn, options];
  });

  return Promise.all(list);
}

async function createProcessor(options) {
  const { remark } = await import('remark');
  const processor = remark();
  const plugins = await requirePlugins(options.plugins);
  processor.use(plugins);

  if (options.enableRehype) {
    processor
      .use((await import('remark-rehype')).default)
      .use((await import('rehype-stringify')).default);
  }
  return processor;
}

function eleventyRemark(options) {
  const processor = createProcessor(options);
  return {
    set: () => {},
    render: (str) =>
      processor.then((p) => p.process(str)).then((result) => result.value),
  };
}

module.exports = eleventyRemark;
