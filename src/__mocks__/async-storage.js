/**
 * Mock for @react-native-async-storage/async-storage
 * This is a web build, so we don't need React Native async storage
 * This mock provides a no-op implementation
 */

const AsyncStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
  clear: async () => {},
  getAllKeys: async () => [],
  multiGet: async () => [],
  multiSet: async () => {},
  multiRemove: async () => {},
};

export default AsyncStorage;

