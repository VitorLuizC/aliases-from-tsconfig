import { join } from 'node:path';
import { readFileSync } from 'node:fs';

class AliasesFromTSConfig {
  private baseUrl: string;

  private aliases: {
    matcher: RegExp;
    replacer: string;
  }[];

  constructor(tsconfigPath: string) {
    const jsonWithComments = readFileSync(tsconfigPath, 'utf-8');

    const json = jsonWithComments.replace(/\/\/[^\n]*\n/g, '\n');

    const config = JSON.parse(json);

    const paths: Record<string, [string]> = config.compilerOptions.paths ?? {};

    this.baseUrl = config.compilerOptions.baseUrl ?? '.';

    this.aliases = Object.entries(paths).map(([alias, locations]) => {
      const group = `(?:${alias.replace(/\*$/, '').replace(/\W/g, '\\$&')})`;

      return {
        matcher: new RegExp(`^${group}${alias.endsWith('*') ? '(.*)' : ''}$`),
        replacer: locations[0]?.replace(/\/\*$/, '') ?? '',
      };
    });
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

      return join(this.baseUrl, replacer, pathWithoutAlias);
    }

    return path;
  }
}

export default AliasesFromTSConfig;
