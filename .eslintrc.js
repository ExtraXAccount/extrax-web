/* eslint-env node */

require('@uniswap/eslint-config/load')

module.exports = {
  extends: '@uniswap/eslint-config/react',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-restricted-imports': 1,
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-imports': 0,
    'import/no-unused-modules': 0,
    'react/no-unescaped-entities': 1,
    // 'prettier/prettier': 0,
  },
}
