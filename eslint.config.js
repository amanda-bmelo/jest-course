const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'warn',
      'react/no-deprecated': 'warn', // Changed to warning instead of error
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Allow emotion's css prop
      
      // Standard-like rules
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(React|Calculator|CalculatorDisplay|AutoScalingText|App)$', 
      }], // Allow common React imports that might seem unused
      'no-console': 'warn',
      'eqeqeq': 'error',
      'curly': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 2],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'brace-style': ['error', '1tbs'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    // Ignore certain files
    ignores: [
      'dist/**',
      'node_modules/**',
      '.git/**',
    ],
  },
]