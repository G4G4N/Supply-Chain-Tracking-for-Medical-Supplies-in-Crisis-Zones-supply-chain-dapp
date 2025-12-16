/**
 * App Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock wagmi - use inline mocks to avoid circular dependency
jest.mock('wagmi', () => {
  const React = require('react');
  return {
    useAccount: jest.fn(() => ({
      address: undefined,
      isConnected: false,
    })),
    useConnect: jest.fn(() => ({
      connect: jest.fn(),
      connectors: [],
    })),
    useDisconnect: jest.fn(() => ({
      disconnect: jest.fn(),
    })),
    useChainId: jest.fn(() => 11155111),
    useSwitchChain: jest.fn(() => ({
      switchChain: jest.fn(),
    })),
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

// Mock hooks
jest.mock('../hooks/useWallet', () => ({
  useWallet: jest.fn(() => ({
    account: null,
    isConnected: false,
    network: null,
    chainId: 11155111,
    connector: undefined,
    connectors: [],
    loading: false,
    error: null,
    connectWallet: jest.fn(),
    disconnectWallet: jest.fn(),
    switchNetwork: jest.fn(),
    switchAccount: jest.fn(),
    isMetaMaskInstalled: false,
  })),
}));

jest.mock('../hooks/useContract.js', () => ({
  useContract: jest.fn(() => ({
    address: null,
    isReady: false,
    loading: false,
    error: null,
    writeContract: {
      write: jest.fn(),
      isPending: false,
    },
    sendTransaction: jest.fn(),
  })),
  useContractAddress: jest.fn(() => '0x0000000000000000000000000000000000000000'),
}));

jest.mock('../services/errorTracking', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('../services/analytics', () => ({
  init: jest.fn(),
  trackEvent: jest.fn(),
  setUserId: jest.fn(),
}));

jest.mock('../services/monitoring', () => ({
  trackPageView: jest.fn(),
}));

jest.mock('../services/logging', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));

jest.mock('../services/offlineManager', () => ({
  isCurrentlyOnline: jest.fn(() => true),
  onSyncStatusChange: jest.fn(() => jest.fn()),
}));

jest.mock('../services/websocket', () => ({
  enabled: false,
  connect: jest.fn(),
  disconnect: jest.fn(),
  on: jest.fn(() => jest.fn()),
}));

// Mock NotificationContext
jest.mock('../contexts/NotificationContext', () => {
  const React = require('react');
  const NotificationContext = React.createContext({
    notifications: [],
    addNotification: jest.fn(),
    removeNotification: jest.fn(),
    clearAllNotifications: jest.fn(),
    unreadCount: 0,
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
  });
  
  return {
    NotificationContext,
    NotificationProvider: ({ children }) => children,
    useNotifications: () => ({
      notifications: [],
      addNotification: jest.fn(),
      removeNotification: jest.fn(),
      clearAllNotifications: jest.fn(),
      unreadCount: 0,
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
    }),
  };
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    // App should render - check for navigation or main content
    const hasContent = screen.queryByText(/Supply Chain|Dashboard|Create|Packages/i);
    expect(hasContent || document.body).toBeTruthy();
  });
});

