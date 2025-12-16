/**
 * CreateShipmentForm Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateShipmentForm } from '../../components/create-shipment-form';
import { NotificationProvider } from '../../contexts/NotificationContext';

// Mock wagmi - use inline mocks to avoid circular dependency
jest.mock('wagmi', () => {
  const React = require('react');
  const mockUseAccount = jest.fn(() => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
    isConnecting: false,
    isDisconnected: false,
    connector: undefined,
  }));
  
  return {
    useAccount: mockUseAccount,
    useWriteContract: jest.fn(() => ({
      writeContract: jest.fn(),
      writeContractAsync: jest.fn(),
      isPending: false,
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

jest.mock('../../hooks/useContract.js', () => ({
  useContractAddress: jest.fn(() => '0x0000000000000000000000000000000000000000'),
  useContract: jest.fn(() => ({
    address: '0x0000000000000000000000000000000000000000',
    isReady: true,
  })),
}));

jest.mock('../../config/contracts', () => ({
  getContractABI: jest.fn(() => []),
}));

// Mock NotificationContext
jest.mock('../../contexts/NotificationContext', () => {
  const React = require('react');
  const NotificationContext = React.createContext({
    showNotification: jest.fn(),
    clearNotifications: jest.fn(),
    notifications: [],
  });
  
  return {
    NotificationContext,
    NotificationProvider: ({ children }) => children,
    useNotifications: () => ({
      showNotification: jest.fn(),
      clearNotifications: jest.fn(),
      notifications: [],
    }),
  };
});

// Import wagmi to access the mocked functions
const wagmi = require('wagmi');

describe('CreateShipmentForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Ensure useAccount returns the correct value
    wagmi.useAccount.mockReturnValue({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
      isConnecting: false,
      isDisconnected: false,
      connector: undefined,
    });
  });

  const renderWithProvider = (component) => {
    return render(
      <NotificationProvider>
        {component}
      </NotificationProvider>
    );
  };

  it('renders without crashing', () => {
    renderWithProvider(<CreateShipmentForm walletConnected={true} />);
    // Component should render - check for any text that should be present
    expect(screen.getByText(/Create Shipment|Create Package|Description/i)).toBeInTheDocument();
  });

  it('displays description input', () => {
    renderWithProvider(<CreateShipmentForm walletConnected={true} />);
    const input = screen.getByPlaceholderText(/description/i);
    expect(input).toBeInTheDocument();
  });

  it('shows wallet connection message when not connected', () => {
    renderWithProvider(<CreateShipmentForm walletConnected={false} />);
    // Should show message about connecting wallet
    expect(screen.getByText(/connect|wallet/i)).toBeInTheDocument();
  });
});

