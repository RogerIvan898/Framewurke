module.exports = {
  parser: '@typescript-eslint/parser', // Используем парсер TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Поддержка последних возможностей ECMAScript
    sourceType: 'module', // Использование модулей ES
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Рекомендованные правила для TypeScript
  ],
  rules: {
    // Настройте свои правила здесь
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
};
