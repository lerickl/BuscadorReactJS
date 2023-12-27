module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
 
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh' , 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'eslint-disable-next-line': 'off',
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    'react-hooks/exhaustive-deps': 'off'
    
  },
}
