/**
 * Mock for wagmi library
 * This prevents ES module import errors in Jest tests
 * Using CommonJS format for better Jest compatibility
 */

const React = require('react');

// Mock all wagmi hooks
const useAccount = jest.fn(() => ({
  address: '0x1234567890123456789012345678901234567890',
  isConnected: true,
  isConnecting: false,
  isDisconnected: false,
  connector: undefined,
}));

const useConnect = jest.fn(() => ({
  connect: jest.fn(),
  connectors: [],
  isPending: false,
}));

const useDisconnect = jest.fn(() => ({
  disconnect: jest.fn(),
}));

const useChainId = jest.fn(() => 11155111);

const useSwitchChain = jest.fn(() => ({
  switchChain: jest.fn(),
  isPending: false,
}));

const useWriteContract = jest.fn(() => ({
  writeContract: jest.fn(),
  writeContractAsync: jest.fn(),
  isPending: false,
  isError: false,
  error: null,
  data: null,
}));

const useWaitForTransactionReceipt = jest.fn(() => ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
}));

const usePublicClient = jest.fn(() => ({
  readContract: jest.fn(),
  getBlockNumber: jest.fn(),
}));

const useReadContract = jest.fn(() => ({
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn(),
}));

const useWatchContractEvent = jest.fn(() => ({}));

const WagmiProvider = ({ children }) => children;

const WagmiContext = React.createContext ? React.createContext(null) : {};

const createConfig = jest.fn(() => ({}));

// CommonJS exports
module.exports = {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
  usePublicClient,
  useReadContract,
  useWatchContractEvent,
  WagmiProvider,
  WagmiContext,
  createConfig,
};
