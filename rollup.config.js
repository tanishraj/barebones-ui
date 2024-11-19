import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json' with { type: 'json' };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main, // CommonJS format
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module, // ES Module format
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically externalize peerDependencies
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these extensions
    }), // Locate and bundle dependencies in node_modules
    commonjs(), // Convert CommonJS modules to ES6
    json(), // Allow Rollup to import JSON files
    typescript({
      tsconfig: './tsconfig.app.json', // Specify the tsconfig path
      clean: true, // Clean cache before each build
    }), // Compile TypeScript
    postcss({
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify CSS
      sourceMap: true, // Enable source maps
      modules: false, // Disable CSS modules if not needed
    }), // Process CSS with PostCSS
  ],
  external: ['react', 'react-dom'], // Mark peerDependencies as external
};
