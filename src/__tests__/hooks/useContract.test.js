/**
 * useContract Hook Tests
 */

import { renderHook } from '@testing-library/react';
import { useContract, useContractAddress } from '../../hooks/useContract';

// Mock wagmi - moduleNameMapper in jest.config.js handles the base mapping
// We create inline mocks to avoid circular dependency with require()
jest.mock('wagmi', () => {
  const React = require('react');
  return {
    useAccount: jest.fn(() => ({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
      connector: undefined,
    })),
    useConnect: jest.fn(() => ({
      connect: jest.fn(),
      connectors: [],
      isPending: false,
    })),
    useDisconnect: jest.fn(() => ({
      disconnect: jest.fn(),
    })),
    useChainId: jest.fn(() => 11155111), // Default return value
    useSwitchChain: jest.fn(() => ({
      switchChain: jest.fn(),
      isPending: false,
    })),
    useWriteContract: jest.fn(() => ({
      writeContract: jest.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    })),
    useWaitForTransactionReceipt: jest.fn(() => ({
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: null,
      error: null,
    })),
    usePublicClient: jest.fn(() => ({
      readContract: jest.fn(),
      getBlockNumber: jest.fn(),
    })),
    useReadContract: jest.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
    useWatchContractEvent: jest.fn(() => ({})),
    WagmiProvider: ({ children }) => children,
    createConfig: jest.fn(() => ({})),
    http: jest.fn(() => ({})),
  };
});

jest.mock('../../config/wagmi', () => ({
  getContractAddressForChain: jest.fn((chainId) => {
    if (chainId === 11155111) {
      return '0x0000000000000000000000000000000000000000';
    }
    return null;
  }),
}));

jest.mock('../../config/contracts', () => ({
  getContractABI: jest.fn(() => []),
}));

jest.mock('../../services/logging', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

// Import wagmi to access the mocked functions
const wagmi = require('wagmi');

describe('useContract Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mocks to default values
    wagmi.useChainId.mockReturnValue(11155111);
    wagmi.useWriteContract.mockReturnValue({
      writeContract: jest.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    });
  });

  it('returns contract address for current chain', () => {
    const { result } = renderHook(() => useContractAddress());
    expect(result.current).toBe('0x0000000000000000000000000000000000000000');
  });

  it('returns contract instance when address is available', () => {
    const { result } = renderHook(() => useContract());

    expect(result.current.isReady).toBe(true);
    expect(result.current.address).toBe('0x0000000000000000000000000000000000000000');
  });

  it('returns not ready when address is not available', () => {
    wagmi.useChainId.mockReturnValue(1); // Different chain without address
    const { result } = renderHook(() => useContract());

    expect(result.current.isReady).toBe(false);
  });
});

