/**
 * TransactionQueue Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionQueue from '../../components/TransactionQueue';
import * as useTransaction from '../../hooks/useTransaction';

jest.mock('../../hooks/useTransaction');

describe('TransactionQueue Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when no transactions', () => {
    useTransaction.useTransaction.mockReturnValue({
      pendingTransactions: [],
      transactionHistory: [],
      cancelTransaction: jest.fn(),
    });

    const { container } = render(<TransactionQueue network="sepolia" />);
    // Use queryByRole instead of direct node access
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it('displays pending transactions', () => {
    const mockTransactions = [
      {
        id: '1',
        status: 'pending',
        hash: '0x1234567890123456789012345678901234567890abcdef1234567890abcdef123456',
        metadata: { method: 'createPackage', description: 'Test' },
        submittedAt: Date.now(),
      },
    ];

    useTransaction.useTransaction.mockReturnValue({
      pendingTransactions: mockTransactions,
      transactionHistory: [],
      cancelTransaction: jest.fn(),
    });

    render(<TransactionQueue network="sepolia" />);
    // Component shows "Transaction Queue" heading
    expect(screen.getByText(/Transaction Queue/i)).toBeInTheDocument();
    // Component shows pending count badge when there are pending transactions
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Expand the component to see transaction details
    const expandButton = screen.getByRole('button', { name: /▶|▼/ });
    fireEvent.click(expandButton);
    
    // Check for "Pending" tab button
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    // Check for transaction hash (component truncates it)
    expect(screen.getByText(/0x12345678/i)).toBeInTheDocument();
    // Check for method name and status in transaction details
    expect(screen.getByText(/createPackage/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it('displays transaction history', () => {
    const mockHistory = [
      {
        id: '1',
        status: 'confirmed',
        hash: '0x1234567890123456789012345678901234567890abcdef1234567890abcdef123456',
        metadata: { method: 'transferOwnership' },
        submittedAt: Date.now(),
      },
    ];

    useTransaction.useTransaction.mockReturnValue({
      pendingTransactions: [],
      transactionHistory: mockHistory,
      cancelTransaction: jest.fn(),
    });

    render(<TransactionQueue network="sepolia" />);
    // Component shows "Transaction Queue" heading
    expect(screen.getByText(/Transaction Queue/i)).toBeInTheDocument();
    
    // Expand the component to see transaction details
    const expandButton = screen.getByRole('button', { name: /▶|▼/ });
    fireEvent.click(expandButton);
    
    // Click on History tab to see history
    const historyButton = screen.getByText(/History/i);
    fireEvent.click(historyButton);
    
    // Check for transaction details
    expect(screen.getByText(/transferOwnership/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });
});

