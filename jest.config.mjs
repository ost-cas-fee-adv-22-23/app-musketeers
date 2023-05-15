import nextJest from 'next/jest.js';

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '@smartive-education/design-system-component-library-musketeers':
      '<rootDir>/node_modules/@smartive-education/design-system-component-library-musketeers/dist/index.js',
    jose: '<rootDir>/node_modules/jose/dist/browser/index.js',
    '@panva': '<rootDir>/node_modules/@panva/hkdf/dist/web/index.js',
    uuid: '<rootDir>/node_modules/uuid/dist/esm-browser/index.js',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/e2e/'],
};

const createJestConfig = nextJest({ dir: './' });

const config = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    'node_modules/(?!(@smartive-education/design-system-component-library-musketeers|jose|@panva|uuid)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
});

export default config;
