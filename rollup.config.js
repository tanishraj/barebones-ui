import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      { file: 'dist/index.css', format: 'es' },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        skip: ['react', 'react-dom'],
      }),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
        clean: true,
      }),
      postcss({
        extract: true,
        minimize: false,
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
];
