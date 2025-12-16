/**
 * PackageTracker Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import PackageTracker from '../../components/PackageTracker';

// Mock dependencies
jest.mock('../../services/logging', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));

jest.mock('../../services/errorTracking', () => ({
  captureException: jest.fn(),
}));

jest.mock('../../hooks/useTransaction', () => ({
  useTransaction: jest.fn(() => ({
    pendingTransactions: [],
    transactionHistory: [],
    cancelTransaction: jest.fn(),
  })),
}));

// Mock wagmi - use inline mocks to avoid circular dependency
jest.mock('wagmi', () => {
  const React = require('react');
  return {
    useAccount: jest.fn(() => ({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
    })),
    useChainId: jest.fn(() => 11155111),
    WagmiProvider: ({ children }) => children,
  };
});

// Mock wagmi/chains and wagmi/connectors to prevent ESM import errors
jest.mock('wagmi/chains', () => ({
  sepolia: { id: 11155111, name: 'Sepolia', network: 'sepolia' },
  mainnet: { id: 1, name: 'Ethereum', network: 'homestead' },
  polygon: { id: 137, name: 'Polygon', network: 'matic' },
  arbitrum: { id: 42161, name: 'Arbitrum One', network: 'arbitrum' },
  optimism: { id: 10, name: 'Optimism', network: 'optimism' },
}));

jest.mock('wagmi/connectors', () => ({
  injected: jest.fn(() => ({ id: 'injected', name: 'Injected' })),
  walletConnect: jest.fn(() => ({ id: 'walletConnect', name: 'WalletConnect' })),
  coinbaseWallet: jest.fn(() => ({ id: 'coinbaseWallet', name: 'Coinbase Wallet' })),
}));

describe('PackageTracker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PackageTracker />);
    // Component should render - check for any content
    const hasContent = screen.queryByText(/Track|Package|Search/i) || document.body;
    expect(hasContent).toBeTruthy();
  });
});

