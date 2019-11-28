const eleventyRemark = require('../src/eleventyRemark');

describe('eleventyRemark()', () => {
  it('render() processes markdown with default options', async () => {
    const plugin = eleventyRemark({ plugins: [] });
    const html = await plugin.render('*foo*');

    expect(html).toContain('<em>foo</em>');
  });
});
