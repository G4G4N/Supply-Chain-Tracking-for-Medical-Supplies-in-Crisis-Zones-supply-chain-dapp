/**
 * Logging Service Tests
 */

// Mock config to ensure development mode for logging
jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    app: {
      environment: 'development',
    },
  },
}));

// Import logger after mocks are set up
let logger;

describe('Logging Service', () => {
  let consoleLogSpy, consoleInfoSpy, consoleWarnSpy, consoleErrorSpy;
  const originalEnv = process.env.REACT_APP_LOG_LEVEL;

  beforeEach(() => {
    // Set environment to development to ensure logs are output
    process.env.REACT_APP_LOG_LEVEL = 'DEBUG';
    process.env.NODE_ENV = 'development';
    
    // Spy on console methods before importing logger
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Import logger after spies are set up
    logger = require('../../services/logging').default;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    process.env.REACT_APP_LOG_LEVEL = originalEnv;
  });

  it('logs debug messages', () => {
    logger.debug('Test message', { data: 'test' });
    // Debug logs output in development mode with DEBUG level
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('logs info messages', () => {
    logger.info('Test message', { data: 'test' });
    // Info logs use console.info in development mode
    expect(consoleInfoSpy).toHaveBeenCalled();
  });

  it('logs warning messages', () => {
    logger.warn('Test warning', { data: 'test' });
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('logs error messages', () => {
    const error = new Error('Test error');
    logger.error('Test error', error, { data: 'test' });
    // Error logs always output regardless of environment
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

