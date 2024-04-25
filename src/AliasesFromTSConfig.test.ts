import { join } from 'node:path';
import { cwd } from 'node:process';
import mockFileSystem, { restore } from 'mock-fs';
import AliasesFromTSConfig from './AliasesFromTSConfig.js';

describe('unit tests | AliasesFromTSConfig', () => {
  beforeEach(() => {
    mockFileSystem({
      'tsconfig.json': `
        {
          "compilerOptions": {
            // Aliases settings
            "baseUrl": "./",
            "paths": {
              "@": ["./src/index.js"],
              "@/*": ["./src/*"],
              "@ui/*": ["./src/components/ui/*"]
            }
          }
        }
      `,
    });
  });

  afterEach(restore);

  describe('AliasesFromTSConfig.apply', () => {
    it("applies the aliases from 'tsconfig.json' to received path", () => {
      const aliases = new AliasesFromTSConfig('tsconfig.json');

      expect(aliases.apply('../main.js')).toBe('../main.js');
      expect(aliases.apply('@vuejs/core')).toBe('@vuejs/core');
      expect(aliases.apply('@')).toBe(join(cwd(), 'src/index.js'));
      expect(aliases.apply('@/sentry.js')).toBe(join(cwd(), 'src/sentry.js'));
      expect(aliases.apply('@ui/Icon.js')).toBe(
        join(cwd(), 'src/components/ui/Icon.js'),
      );
    });
  });

  describe('AliasesFromTSConfig.hasAlias', () => {
    it("checks if received path has an alias from 'tsconfig.json'", () => {
      const aliases = new AliasesFromTSConfig('tsconfig.json');

      expect(aliases.hasAlias('../main.js')).toBe(false);
      expect(aliases.hasAlias('@vuejs/core')).toBe(false);
      expect(aliases.hasAlias('@')).toBe(true);
      expect(aliases.hasAlias('@/ui/Icon.js')).toBe(true);
    });
  });

  describe('AliasesFromTSConfig.getAliasesForWebpack', () => {
    it('gets the aliases for webpack', () => {
      const aliases = new AliasesFromTSConfig('tsconfig.json');

      expect(aliases.getAliasesForWebpack()).toEqual({
        '@': join(cwd(), 'src'),
        '@ui': join(cwd(), 'src/components/ui'),
      });
    });
  });
});
