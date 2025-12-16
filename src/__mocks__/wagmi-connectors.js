/**
 * Mock for wagmi/connectors
 * This prevents ES module import errors in Jest tests
 */

const injected = jest.fn(() => ({ id: 'injected', name: 'Injected' }));
const walletConnect = jest.fn(() => ({ id: 'walletConnect', name: 'WalletConnect' }));
const coinbaseWallet = jest.fn(() => ({ id: 'coinbaseWallet', name: 'Coinbase Wallet' }));

module.exports = {
  injected,
  walletConnect,
  coinbaseWallet,
};

