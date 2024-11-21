import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';
import typescriptEngine from 'typescript';
import terser from '@rollup/plugin-terser';

const packageJson = JSON.parse(readFileSync('./package.json'));

export default {
  input: './src/index.ts',
  output: [
    {
      // file: packageJson.module,
      // format: 'es',
      // exports: 'named',
      // sourcemap: false,
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      preserveModules: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.app.json',
      typescript: typescriptEngine,
      sourceMap: false,
      exclude: [
        'coverage',
        '.storybook',
        'storybook-static',
        'config',
        'dist',
        'node_modules/**',
        '*.cjs',
        '*.mjs',
        '**/__snapshots__/*',
        '**/__tests__',
        '**/*.test.js+(|x)',
        '**/*.test.ts+(|x)',
        '**/*.mdx',
        '**/*.story.ts+(|x)',
        '**/*.story.js+(|x)',
        '**/*.stories.ts+(|x)',
        '**/*.stories.js+(|x)',
        'setupTests.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    }),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
      modules: false,
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
