/**
 * CreateShipmentForm Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateShipmentForm } from '../../components/create-shipment-form';

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useWriteContract: jest.fn(() => ({
    writeContract: jest.fn(),
    writeContractAsync: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
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
  useAccount: jest.fn(() => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
  })),
}));

jest.mock('../hooks/useContract', () => ({
  useContractAddress: jest.fn(() => '0x0000000000000000000000000000000000000000'),
}));

jest.mock('../config/contracts', () => ({
  getContractABI: jest.fn(() => []),
}));

describe('CreateShipmentForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CreateShipmentForm walletConnected={true} />);
    // Component should render - check for any text that should be present
    expect(screen.getByText(/Create Shipment|Create Package|Description/i)).toBeInTheDocument();
  });

  it('displays description input', () => {
    render(<CreateShipmentForm walletConnected={true} />);
    const input = screen.getByPlaceholderText(/description/i);
    expect(input).toBeInTheDocument();
  });

  it('shows wallet connection message when not connected', () => {
    render(<CreateShipmentForm walletConnected={false} />);
    // Should show message about connecting wallet
    expect(screen.getByText(/connect|wallet/i)).toBeInTheDocument();
  });
});

