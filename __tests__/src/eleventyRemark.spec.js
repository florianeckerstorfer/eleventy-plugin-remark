import eleventyRemark from '../../src/eleventyRemark';
import mockRemarkPlugin from '../helpers/mockRemarkPlugin';
import remark from 'remark';

jest.mock('remark');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('eleventyRemark()', () => {
  describe('set()', () => {
    it('should be defined', () => {
      const plugin = eleventyRemark({ plugins: [] });

      expect(plugin.set()).toBeUndefined();
    });
  });

  describe('render()', () => {
    const mockUse = jest.fn();
    const mockProcess = jest.fn((str, cb) => cb(undefined, str));
    const mockProcessor = { use: mockUse, process: mockProcess };
    mockUse.mockReturnValue(mockProcessor);
    remark.mockReturnValue(mockProcessor);

    it('processes markdown with default options', async () => {
      const plugin = eleventyRemark({ plugins: [] });
      const html = await plugin.render('*foo*');

      expect(html).toContain('*foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name', async () => {
      const plugin = eleventyRemark({
        plugins: ['../__tests__/helpers/mockRemarkPlugin'],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name as object', async () => {
      const plugin = eleventyRemark({
        plugins: [
          {
            plugin: '../__tests__/helpers/mockRemarkPlugin'
          }
        ]
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name with options as object', async () => {
      const plugin = eleventyRemark({
        plugins: [
          {
            plugin: '../__tests__/helpers/mockRemarkPlugin',
            options: {}
          }
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function', async () => {
      const plugin = eleventyRemark({
        plugins: [mockRemarkPlugin],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        plugins: [
          {
            plugin: mockRemarkPlugin
          }
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        plugins: [
          {
            plugin: mockRemarkPlugin
          }
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        plugins: [
          {
            plugin: mockRemarkPlugin,
            options: {}
          }
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(2);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when processing markdown', async () => {
      const mockProcess = jest.fn((str, cb) => cb('Invalid', str));
      const mockProcessor = { use: mockUse, process: mockProcess };
      mockUse.mockReturnValue(mockProcessor);

      try {
        const plugin = eleventyRemark({ plugins: [] });
        await plugin.render('foo');
      } catch (error) {
        expect(error).toBe('Invalid');
      }
    });

    it('should handle errors when plugin passed to plugin option is not a function, string or object', async () => {
      const mockProcess = jest.fn((str, cb) => cb(undefined, str));
      const mockProcessor = { use: mockUse, process: mockProcess };
      mockUse.mockReturnValue(mockProcessor);

      try {
        const plugin = eleventyRemark({ plugins: [null] });
        await plugin.render('foo');
      } catch (error) {
        expect(error.message).toBe(
          'plugin has to be an instance of a remark plugin or the name of one'
        );
      }
    });

    it('should handle errors when plugin option is not an array', async () => {
      const mockProcess = jest.fn((str, cb) => cb(undefined, str));
      const mockProcessor = { use: mockUse, process: mockProcess };
      mockUse.mockReturnValue(mockProcessor);

      try {
        const plugin = eleventyRemark({ plugins: 'some-text' });
        await plugin.render('foo');
      } catch (error) {
        expect(error.message).toBe('plugins option is not an array');
      }
    });
  });
});
