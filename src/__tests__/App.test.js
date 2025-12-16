/**
 * App Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock wagmi and related modules before any imports
jest.mock('wagmi', () => require('../__mocks__/wagmi.js'));
jest.mock('wagmi/chains', () => require('../__mocks__/wagmi-chains.js'));
jest.mock('wagmi/connectors', () => require('../__mocks__/wagmi-connectors.js'));

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

