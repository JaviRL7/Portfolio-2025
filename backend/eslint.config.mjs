// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Ignorar carpetas generadas
  { ignores: ['**/dist/**', '**/node_modules/**'] },

  // Reglas base para JS
  eslint.configs.recommended,

  // Reglas TS con type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // Integración con Prettier
  prettierRecommended,

  // Ajustes generales para TS en el proyecto
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },

  // Evitar falsos positivos en DTOs (decoradores de class-validator)
  {
    files: ['src/**/*.dto.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
);
