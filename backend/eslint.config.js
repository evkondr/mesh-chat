import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: { project: './tsconfig.json' }
    },
    rules: {
      // Ваш стиль: точки с запятой (warn - желтый)
      'semi': ['warn', 'always'],
      'semi-spacing': ['warn', { before: false, after: true }],
      // Импорты
      'import/extensions': ['warn', 'ignore', { ts: 'never', js: 'always' }],
      'import/order': 'error',
      // TS-specific
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
);
