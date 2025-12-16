/**
 * Mock for wagmi/chains
 * This prevents ES module import errors in Jest tests
 */

const sepolia = { id: 11155111, name: 'Sepolia', network: 'sepolia' };
const mainnet = { id: 1, name: 'Ethereum', network: 'homestead' };
const polygon = { id: 137, name: 'Polygon', network: 'matic' };
const arbitrum = { id: 42161, name: 'Arbitrum One', network: 'arbitrum' };
const optimism = { id: 10, name: 'Optimism', network: 'optimism' };

module.exports = {
  sepolia,
  mainnet,
  polygon,
  arbitrum,
  optimism,
};

