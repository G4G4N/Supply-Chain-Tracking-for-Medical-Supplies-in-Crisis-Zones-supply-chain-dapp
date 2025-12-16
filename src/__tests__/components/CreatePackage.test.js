/**
 * CreateShipmentForm Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateShipmentForm } from '../../components/create-shipment-form';

// Mock wagmi and related modules before any imports
jest.mock('wagmi', () => require('../../__mocks__/wagmi.js'));
jest.mock('wagmi/chains', () => require('../../__mocks__/wagmi-chains.js'));
jest.mock('wagmi/connectors', () => require('../../__mocks__/wagmi-connectors.js'));

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

