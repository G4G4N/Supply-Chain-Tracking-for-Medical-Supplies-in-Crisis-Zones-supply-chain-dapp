/**
 * useWallet Hook Tests
 */

import { renderHook, act } from '@testing-library/react';
import { useWallet } from '../../hooks/useWallet';

// Mock wagmi hooks
const mockUseAccount = jest.fn();
const mockUseConnect = jest.fn();
const mockUseDisconnect = jest.fn();
const mockUseChainId = jest.fn();
const mockUseSwitchChain = jest.fn();

jest.mock('wagmi', () => ({
  useAccount: () => mockUseAccount(),
  useConnect: () => mockUseConnect(),
  useDisconnect: () => mockUseDisconnect(),
  useChainId: () => mockUseChainId(),
  useSwitchChain: () => mockUseSwitchChain(),
}));

jest.mock('../../config/networks', () => ({
  getNetworkByChainId: jest.fn(() => ({
    name: 'sepolia',
    chainId: 11155111,
  })),
}));

jest.mock('../../services/logging', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../services/analytics', () => ({
  __esModule: true,
  default: {
    clearUser: jest.fn(),
    trackEvent: jest.fn(),
    setUserId: jest.fn(),
  },
}));

describe('useWallet Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset useAccount to return disconnected state by default
    mockUseAccount.mockReturnValue({
      address: undefined,
      isConnected: false,
      connector: undefined,
    });
    
    mockUseConnect.mockReturnValue({
      connect: jest.fn(),
      connectors: [],
      isPending: false,
    });
    
    mockUseDisconnect.mockReturnValue({
      disconnect: jest.fn(),
    });
    
    mockUseChainId.mockReturnValue(11155111);
    
    mockUseSwitchChain.mockReturnValue({
      switchChain: jest.fn(),
      isPending: false,
    });
  });

  it('returns initial state when not connected', () => {
    const { result } = renderHook(() => useWallet());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.account).toBe('');
  });

  it('connects wallet successfully', () => {
    mockUseAccount.mockReturnValue({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
      connector: { name: 'MetaMask' },
    });

    const { result } = renderHook(() => useWallet());

    expect(result.current.isConnected).toBe(true);
    expect(result.current.account).toBe('0x1234567890123456789012345678901234567890');
  });

  it('handles connection rejection', () => {
    mockUseAccount.mockReturnValue({
      address: undefined,
      isConnected: false,
      connector: undefined,
    });

    const { result } = renderHook(() => useWallet());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.account).toBe('');
  });
});

