import eleventyRemark from '../../src/eleventyRemark';
import mockRemarkPlugin from '../helpers/mockRemarkPlugin';
import { remark } from 'remark';

jest.mock('remark');

const defaultOptions = {
  enableRehype: true,
  plugins: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('eleventyRemark()', () => {
  describe('set()', () => {
    it('should be defined', () => {
      const plugin = eleventyRemark(defaultOptions);

      expect(plugin.set()).toBeUndefined();
    });
  });

  describe('render()', () => {
    const mockUse = jest.fn();
    const mockProcess = jest.fn();
    const mockData = jest.fn();
    const mockProcessor = { use: mockUse, process: mockProcess, data: mockData };
    mockUse.mockReturnValue(mockProcessor);
    mockData.mockReturnValue(mockProcessor);  
    remark.mockReturnValue(mockProcessor);
    mockProcess.mockImplementation((str) => Promise.resolve({ value: str }));

    it('processes markdown with default options', async () => {
      const plugin = eleventyRemark(defaultOptions);
      const html = await plugin.render('*foo*');

      expect(html).toContain('*foo*');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('enabled rehype by default', async () => {
      const plugin = eleventyRemark(defaultOptions);
      await plugin.render('*foo*');

      expect(mockUse).toHaveBeenCalledTimes(3);
    });

    it('not enables rehype if enableRehype option is `false`', async () => {
      const plugin = eleventyRemark({ ...defaultOptions, enableRehype: false });
      const html = await plugin.render('*foo*');

      expect(mockUse).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: ['../__tests__/helpers/mockRemarkPlugin'],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name as object', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [
          {
            plugin: '../__tests__/helpers/mockRemarkPlugin',
          },
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin name with options as object', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [
          {
            plugin: '../__tests__/helpers/mockRemarkPlugin',
            options: {},
          },
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [mockRemarkPlugin],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [
          {
            plugin: mockRemarkPlugin,
          },
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [
          {
            plugin: mockRemarkPlugin,
          },
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with a plugin function as object', async () => {
      const plugin = eleventyRemark({
        ...defaultOptions,
        plugins: [
          {
            plugin: mockRemarkPlugin,
            options: {},
          },
        ],
      });
      const html = await plugin.render('foo');

      expect(html).toContain('foo');
      expect(remark).toHaveBeenCalledTimes(1);
      expect(mockUse).toHaveBeenCalledTimes(3);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when processing markdown', async () => {
      const mockProcess = jest.fn((str, cb) => cb('Invalid', str));
      const mockProcessor = { use: mockUse, process: mockProcess };
      mockUse.mockReturnValue(mockProcessor);

      try {
        const plugin = eleventyRemark(defaultOptions);
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
        const plugin = eleventyRemark({ ...defaultOptions, plugins: [null] });
        await plugin.render('foo');
      } catch (error) {
        expect(error.message).toBe(
          'plugin has to be a function or a string, object type passed'
        );
      }
    });

    it('should handle errors when plugin option is not an array', async () => {
      const mockProcess = jest.fn((str, cb) => cb(undefined, str));
      const mockProcessor = { use: mockUse, process: mockProcess };
      mockUse.mockReturnValue(mockProcessor);

      try {
        const plugin = eleventyRemark({
          ...defaultOptions,
          plugins: 'some-text',
        });
        await plugin.render('foo');
      } catch (error) {
        expect(error.message).toBe('plugins option is not an array');
      }
    });
  });
});
