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
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
