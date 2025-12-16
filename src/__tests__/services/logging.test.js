/**
 * Logging Service Tests
 */

import logger from '../../services/logging';

// Mock config to ensure development mode for logging
jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    app: {
      environment: 'development',
    },
  },
}));

describe('Logging Service', () => {
  let consoleLogSpy, consoleWarnSpy, consoleErrorSpy;
  const originalEnv = process.env.REACT_APP_LOG_LEVEL;

  beforeEach(() => {
    // Set environment to development to ensure logs are output
    process.env.REACT_APP_LOG_LEVEL = 'DEBUG';
    
    // Spy on console methods before any mocks
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
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
    // Info logs should call console.log in development mode
    expect(consoleLogSpy).toHaveBeenCalled();
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

