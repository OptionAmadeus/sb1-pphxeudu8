import { vi } from 'vitest';

// Mock window.location
const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  assign: vi.fn(),
  replace: vi.fn()
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  mockLocalStorage.clear();
});