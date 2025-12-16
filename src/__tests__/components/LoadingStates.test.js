/**
 * LoadingStates Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  PackageCardSkeleton,
  ListItemSkeleton,
  LoadingSpinner,
  LoadingOverlay,
  InlineLoader,
  TableSkeleton,
} from '../../components/LoadingStates';

describe('LoadingStates Components', () => {
  it('renders PackageCardSkeleton', () => {
    const { container } = render(<PackageCardSkeleton />);
    // Use container instead of role query to avoid multiple generic elements
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders ListItemSkeleton', () => {
    const { container } = render(<ListItemSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders LoadingSpinner', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders LoadingOverlay with message', () => {
    render(<LoadingOverlay message="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders InlineLoader', () => {
    render(<InlineLoader message="Processing" />);
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('renders TableSkeleton', () => {
    const { container } = render(<TableSkeleton rows={3} columns={4} />);
    // Use container to avoid multiple generic role elements
    expect(container.firstChild).toBeInTheDocument();
  });
});

