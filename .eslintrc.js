module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    curly: 'error',
    'comma-spacing': 'error',
    indent: 0,
    'linebreak-style': 'error',
    'no-cond-assign': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-trailing-spaces': 'error',
    'no-unused-vars': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'import/no-named-as-default': 0,
    'import/no-named-default': 0,
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'react-hooks/exhaustive-deps': 0
  },
  settings: {},
  plugins: ['unused-imports']
}
