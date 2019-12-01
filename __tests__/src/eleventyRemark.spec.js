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
      expect(mockUse).toHaveBeenCalledTimes(1);
      expect(mockProcess).toHaveBeenCalledTimes(1);
    });

    it('processes markdown with plugin options', async () => {
      const plugin = eleventyRemark({ plugins: [mockRemarkPlugin] });
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
  });
});
