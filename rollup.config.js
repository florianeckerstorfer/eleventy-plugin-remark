export default [
  {
    input: '.eleventy.js',
    output: [
      {
        file: 'dist/eleventy.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/eleventy.esm.js',
        format: 'esm',
      },
    ],
    external: ['remark', 'remark-html'],
  },
];
