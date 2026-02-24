import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Ваш стиль: точки с запятой (warn - желтый)
      'semi': ['warn', 'always'],
      'semi-spacing': ['warn', { before: false, after: true }],
      // Импорты
      // TS-specific
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]);