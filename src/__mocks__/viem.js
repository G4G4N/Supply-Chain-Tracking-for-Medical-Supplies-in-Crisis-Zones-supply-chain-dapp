/**
 * Mock for viem library
 * This prevents ES module import errors in Jest tests
 * Using CommonJS format for better Jest compatibility
 */

const parseEther = jest.fn((value) => BigInt(value * 10n ** 18n));
const formatEther = jest.fn((value) => String(value / 10n ** 18n));
const parseUnits = jest.fn((value, decimals = 18) => BigInt(value * 10n ** BigInt(decimals)));
const formatUnits = jest.fn((value, decimals = 18) => String(value / 10n ** BigInt(decimals)));

const getAddress = jest.fn((address) => address);
const isAddress = jest.fn(() => true);

// Address type mock
const Address = String;

// CommonJS exports
module.exports = {
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
  getAddress,
  isAddress,
  Address,
};
