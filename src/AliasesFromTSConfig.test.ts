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
              "@/*": ["./src/*"]
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
      expect(aliases.apply('@')).toBe('src/index.js');
      expect(aliases.apply('@/ui/Icon.js')).toBe('src/ui/Icon.js');
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
});
