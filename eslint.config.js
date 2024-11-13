import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'tailwindcss': pluginTailwindCSS,
      'import': pluginImport,
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link', 'RouterLink'],
          aspects: ['invalidHref'],
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '$/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
        },
      ],
      'import/no-cycle': [
        'error',
        {
          maxDepth: '∞',
          ignoreExternal: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
    },
  },
)
