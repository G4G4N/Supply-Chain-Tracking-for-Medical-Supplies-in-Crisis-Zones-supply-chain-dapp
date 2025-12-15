// Validation utilities for the Supply Chain dApp
import logger from '../services/logging';

export const validateAddress = (address) => {
  if (!address) return 'Address is required';
  if (!address.startsWith('0x')) return 'Address must start with 0x';
  if (address.length !== 42) return 'Address must be 42 characters long';
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return 'Invalid address format';
  return null;
};

export const validatePackageId = (id) => {
  if (!id && id !== 0) return 'Package ID is required';
  const idStr = String(id).trim();
  if (idStr === '') return 'Package ID is required';
  // Check if it's a valid number string (allows only digits, no letters)
  if (!/^\d+$/.test(idStr)) {
    return 'Package ID must be a number';
  }
  const numId = parseInt(idStr, 10);
  if (isNaN(numId) || !Number.isInteger(numId)) return 'Package ID must be a number';
  if (numId < 1) return 'Package ID must be 1 or greater';
  return null;
};

export const validateDescription = (description) => {
  if (!description) return 'Description is required';
  if (description.trim().length === 0) return 'Description cannot be empty';
  if (description.length < 3) return 'Description must be at least 3 characters';
  if (description.length > 500) return 'Description must be less than 500 characters';
  return null;
};

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    logger.error('Failed to copy to clipboard', err);
    return false;
  }
};
