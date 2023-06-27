import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary'],
}

export default config
