import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import type { TSConfig } from './TSConfig';
import parseJSONWithComments from './parseJSONWithComments';

/**
 * An object with the aliases as property keys and paths as its values.
 *
 * @example
 * For this given `jsconfig.json`:
 * ```json
 * {
 *   "compilerOptions": {
 *     "baseUrl": "./app",
 *     "paths": {
 *       "@": ["src/index.mjs"],
 *       "@/*": ["src/*"],
 *       "@ui/*": ["src/components/ui/*"]
 *     }
 *   }
 * }
 * ```
 * It would be something like this object:
 * ```js
 * {
 *   '@': '/home/user/projects/example/app/src',
 *   '@ui': '/home/user/projects/example/app/src/components/ui'
 * }
 * ```
 */
export type AliasesForWebpack = {
  [alias: string]: string;
};

class AliasesFromTSConfig {
  private baseUrl: string;

  private aliases: {
    alias: string;
    matcher: RegExp;
    replacer: string;
  }[];

  private tsconfigPath: string;

  constructor(tsconfigPath: string) {
    this.tsconfigPath = tsconfigPath;

    const jsonWithComments = readFileSync(tsconfigPath).toString('utf-8');

    const config = parseJSONWithComments<TSConfig>(jsonWithComments);

    const paths = config.compilerOptions?.paths ?? {};

    this.baseUrl = config.compilerOptions?.baseUrl ?? '.';

    this.aliases = Object.entries(paths).map(([alias, locations]) => {
      const group = `(?:${alias.replace(/\*$/, '').replace(/\W/g, '\\$&')})`;

      return {
        alias,
        matcher: new RegExp(`^${group}${alias.endsWith('*') ? '(.*)' : ''}$`),
        replacer: locations[0]?.replace(/\/\*$/, '') ?? '',
      };
    });
  }

  /** Resolves received path joining tsconfigPath's dirname and the baseUrl. */
  private resolvePath(path: string): string {
    return resolve(join(dirname(this.tsconfigPath), this.baseUrl, path));
  }

  /** Checks if received path contains an alias from jsconfig/tsconfig.json. */
  hasAlias(path: string): boolean {
    return this.aliases.some((alias) => alias.matcher.test(path));
  }

  /** Replaces the alias from jsconfig/tsconfig.json with the correct path. */
  apply(path: string) {
    for (const { matcher, replacer } of this.aliases) {
      const result = matcher.exec(path);

      if (!result) continue;

      const pathWithoutAlias = result[1] ?? '';

      return this.resolvePath(join(replacer, pathWithoutAlias));
    }

    return path;
  }

  /**
   * Gets an object with the aliases as properties and paths as values.
   *
   * @example
   * ```js
   * // webpack.config.js
   *
   * const aliasesFromTSConfig = new AliasesFromTSConfig('./tsconfig.json');
   *
   * module.exports = {
   *   resolve: {
   *     alias: aliasesFromTSConfig.getAliasesForWebpack(),
   *     // ...
   *   },
   *   // ...
   * };
   * ```
   */
  getAliasesForWebpack(): AliasesForWebpack {
    const aliases: AliasesForWebpack = {};

    for (const { alias, replacer } of this.aliases) {
      const aliasForFolder = alias.endsWith('/*');

      const property = aliasForFolder ? alias.slice(0, -2) : alias;

      if (property in aliases && !aliasForFolder) continue;

      aliases[property] = this.resolvePath(replacer);
    }

    return aliases;
  }
}

export default AliasesFromTSConfig;
