import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import packageJson from './package.json' with { type: 'json' };

export default [
  {
    input: {
      index: 'src/index.ts',
      core: 'src/core.ts',
      heavy: 'src/heavy.ts',
    },
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        entryFileNames: '[name].cjs',
        chunkFileNames: '[name]-[hash].cjs',
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        skip: ['react', 'react-dom'],
      }),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        useTsconfigDeclarationDir: true,
        clean: true,
      }),
      postcss({
        config: {
          path: './postcss.config.cjs',
        },
        extensions: ['.css'],
        // DaisyUI/Tailwind emit modern CSS math functions that older minifiers
        // can mis-parse. Ship library CSS unminified and let app bundlers minify.
        minimize: false,
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      }),
      visualizer({
        filename: 'dist/bundle-stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'src/core.ts',
    output: [{ file: 'dist/core.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'src/heavy.ts',
    output: [{ file: 'dist/heavy.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
