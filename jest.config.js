module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // Ensure TypeScript files are transformed
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Clear module cache to ensure fresh transforms
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // Mock wagmi - must come before other patterns
    '^wagmi$': '<rootDir>/src/__mocks__/wagmi.js',
    '^wagmi/chains$': '<rootDir>/src/__mocks__/wagmi-chains.js',
    '^wagmi/connectors$': '<rootDir>/src/__mocks__/wagmi-connectors.js',
    '^wagmi/(.*)$': '<rootDir>/src/__mocks__/wagmi.js',
    '^@wagmi/(.*)$': '<rootDir>/src/__mocks__/wagmi.js',
    // Mock viem
    '^viem$': '<rootDir>/src/__mocks__/viem.js',
    '^viem/(.*)$': '<rootDir>/src/__mocks__/viem.js',
    // Mock react-query
    '^@tanstack/react-query$': '<rootDir>/src/__mocks__/react-query.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/index.tsx',
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/*.d.ts',
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
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(wagmi|viem|@tanstack|@wagmi|@wagmi/core)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};

