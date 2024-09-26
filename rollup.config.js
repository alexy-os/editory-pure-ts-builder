import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/editory.ts',
  output: {
    file: 'dist/editory.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript()
  ]
};