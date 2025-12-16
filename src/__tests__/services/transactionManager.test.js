/**
 * Transaction Manager Service Tests
 */

import transactionManager from '../../services/transactionManager';

// Mock signer and provider
const mockSigner = {
  address: '0x1234567890123456789012345678901234567890',
  getAddress: jest.fn(() => Promise.resolve('0x1234567890123456789012345678901234567890')),
};

const mockProvider = {
  getTransactionCount: jest.fn(() => Promise.resolve(0)),
  waitForTransaction: jest.fn(() => Promise.resolve({})),
};

// Mock logging service
jest.mock('../../services/logging', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

// Mock error tracking
jest.mock('../../services/errorTracking', () => ({
  __esModule: true,
  default: {
    captureException: jest.fn(),
  },
}));

describe('TransactionManager Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Initialize transaction manager with mock signer and provider
    transactionManager.init(mockProvider, mockSigner);
  });

  afterEach(() => {
    // Clean up - reset transaction manager state if needed
    if (transactionManager.clear) {
      transactionManager.clear();
    }
  });

  it('should add transaction to queue', async () => {
    // Ensure signer is initialized - init is already called in beforeEach
    // Verify signer is set
    expect(transactionManager.signer).toBe(mockSigner);
    
    const mockTx = Promise.resolve({ hash: '0x123', nonce: 0 });
    const entry = await transactionManager.addTransaction(mockTx, {
      method: 'test',
    });

    expect(entry).toBeDefined();
    expect(entry.id).toBeDefined();
    expect(entry.status).toBe('pending');
  });

  it('should get pending transactions', () => {
    const pending = transactionManager.getPendingTransactions();
    expect(Array.isArray(pending)).toBe(true);
  });

  it('should get transaction history', () => {
    const history = transactionManager.getHistory(10);
    expect(Array.isArray(history)).toBe(true);
  });

  it('should cancel transaction', () => {
    const result = transactionManager.cancelTransaction('test-id');
    expect(result).toBeDefined();
  });
});

