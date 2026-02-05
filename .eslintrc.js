module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ["babel", "@typescript-eslint"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      "typescript": {
          "alwaysTryTypes": true
      }
    }
  },
  ignorePatterns: ['.eslintrc.js', 'src/tests/**/*'],
  rules: {
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'indent': "off",
    'import/extensions:': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
  },
};
