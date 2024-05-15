import globals from 'globals'

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'array-callback-return': 'error',
      'no-duplicate-imports': 'error',
      'eqeqeq': ['error', 'smart'],
      'id-length': [
        'warn',
        {
          'min': 1,
          'max': 30
        }
      ],
      'no-eval': 'error',
      'no-new-wrappers': 'warn',
      'no-throw-literal': 'warn',
      'func-style': [
        'error',
        'expression',
        {
          'allowArrowFunctions': true
        }
      ],
      'no-console': [
        'warn',
        {
          'allow': ['warn', 'error', 'info']
        }
      ],
      'no-mixed-operators': 'warn',
      'no-nested-ternary': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-var': 'error',
      'max-statements-per-line': 'error',
      'camelcase': [
        'warn',
        {
          'properties': 'always',
          'ignoreDestructuring': true
        }
      ],
      'brace-style': ['warn', '1tbs'],
      'arrow-spacing': 'warn',
      'comma-style': 'warn',
      'eol-last': 'error',
      'arrow-body-style': ['warn', 'always'],
      'prefer-const': [
        'warn',
        {
          'destructuring': 'all',
          'ignoreReadBeforeAssign': true
        }
      ],
      'prefer-object-has-own': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-template': 'warn',
      'require-await': 'error'
    }
  }
]
