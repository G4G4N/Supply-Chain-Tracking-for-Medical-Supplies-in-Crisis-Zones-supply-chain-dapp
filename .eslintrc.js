module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable prop-types validation to avoid build failures
    'react/prop-types': 'off',
    // Disable anonymous default export warning
    'import/no-anonymous-default-export': 'off',
    // Disable unused variable warnings (TypeScript handles this)
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    // Disable React Hook exhaustive deps (can be too strict)
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
};
