/**
 * Mock for @tanstack/react-query
 * Using CommonJS format for better Jest compatibility
 */

const QueryClient = jest.fn(() => ({
  invalidateQueries: jest.fn(),
  clear: jest.fn(),
}));

const QueryClientProvider = ({ children }) => children;

const useQuery = jest.fn(() => ({
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn(),
}));

const useMutation = jest.fn(() => ({
  mutate: jest.fn(),
  mutateAsync: jest.fn(),
  isLoading: false,
  isError: false,
  error: null,
}));

// CommonJS exports
module.exports = {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
};
