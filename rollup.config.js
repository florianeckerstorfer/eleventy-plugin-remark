export default [
  {
    input: '.eleventy.js',
    output: [
      {
        file: 'dist/eleventy.cjs.js',
        format: 'cjs',
        exports: 'default',
      },
      {
        file: 'dist/eleventy.esm.js',
        format: 'esm',
      },
    ],
    external: ['remark', 'remark-rehype', 'rehype-stringify'],
  },
];
