import eleventy from '../.eleventy';

describe('.elventy()', () => {
  describe('configFunction()', () => {
    it('should set markdown library with default options', () => {
      const mockSetLibrary = jest.fn();
      const eleventyConfig = {
        setLibrary: mockSetLibrary,
      };

      eleventy.configFunction(eleventyConfig);

      expect(mockSetLibrary).toHaveBeenCalledTimes(1);
    });
  });
});
