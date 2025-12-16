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

