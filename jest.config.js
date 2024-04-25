// @ts-check
/* eslint-env node */

/**
 * An object with Jest options.
 * @type {import('@jest/types').Config.InitialOptions}
 */
const options = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  transform: {
    '.ts': ['ts-jest', {
      useESM: true,
      tsconfig: {
        verbatimModuleSyntax: false
      }
    }]
  }
};

module.exports = options;
