module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // Mock wagmi - must come before other patterns
    '^wagmi$': '<rootDir>/src/__mocks__/wagmi.js',
    '^wagmi/(.*)$': '<rootDir>/src/__mocks__/wagmi.js',
    '^@wagmi/(.*)$': '<rootDir>/src/__mocks__/wagmi.js',
    // Mock viem
    '^viem$': '<rootDir>/src/__mocks__/viem.js',
    '^viem/(.*)$': '<rootDir>/src/__mocks__/viem.js',
    // Mock react-query
    '^@tanstack/react-query$': '<rootDir>/src/__mocks__/react-query.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(wagmi|viem|@tanstack|@wagmi|@wagmi/core)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};

