/**
 * useContract Hook Tests
 */

import { renderHook } from '@testing-library/react';
import { useContract, useContractAddress } from '../../hooks/useContract';

// Create mock functions that can be controlled in tests
const mockUseChainId = jest.fn();
const mockUseWriteContract = jest.fn();

// Mock wagmi and related modules before any imports
jest.mock('wagmi', () => {
  const wagmiMock = require('../../__mocks__/wagmi.js');
  return {
    ...wagmiMock,
    useChainId: mockUseChainId,
    useWriteContract: () => mockUseWriteContract(),
    useReadContract: jest.fn(() => ({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    })),
    useWatchContractEvent: jest.fn(() => ({})),
  };
});
jest.mock('wagmi/chains', () => require('../../__mocks__/wagmi-chains.js'));
jest.mock('wagmi/connectors', () => require('../../__mocks__/wagmi-connectors.js'));

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

describe('useContract Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseChainId.mockReturnValue(11155111);
    mockUseWriteContract.mockReturnValue({
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
    mockUseChainId.mockReturnValue(1); // Different chain without address
    const { result } = renderHook(() => useContract());

    expect(result.current.isReady).toBe(false);
  });
});

