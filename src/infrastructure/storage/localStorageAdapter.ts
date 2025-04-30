/**
 * LocalStorage adapter for storing and retrieving data
 */
export const localStorageAdapter = {
  /**
   * Set an item in localStorage
   * @param key - The key to store the data under
   * @param value - The value to store
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  },

  /**
   * Get an item from localStorage
   * @param key - The key to retrieve data from
   * @param defaultValue - Default value to return if key doesn't exist
   * @returns The stored value or defaultValue if not found
   */
  getItem<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Remove an item from localStorage
   * @param key - The key to remove
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  /**
   * Clear all data from localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
};
