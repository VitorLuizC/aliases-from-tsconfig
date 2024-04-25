/*!
 * aliases-from-tsconfig v0.1.1
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

import { readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

/** Parses a JSON with comments to JavaScript value. */
function parseJSONWithComments(jsonWithComments) {
    return JSON.parse(jsonWithComments.replace(/\/\/[^\n]*\n/g, '\n'));
}

class AliasesFromTSConfig {
    baseUrl;
    aliases;
    tsconfigPath;
    constructor(tsconfigPath) {
        this.tsconfigPath = tsconfigPath;
        const jsonWithComments = readFileSync(tsconfigPath).toString('utf-8');
        const config = parseJSONWithComments(jsonWithComments);
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
    resolvePath(path) {
        return resolve(join(dirname(this.tsconfigPath), this.baseUrl, path));
    }
    /** Checks if received path contains an alias from jsconfig/tsconfig.json. */
    hasAlias(path) {
        return this.aliases.some((alias) => alias.matcher.test(path));
    }
    /** Replaces the alias from jsconfig/tsconfig.json with the correct path. */
    apply(path) {
        for (const { matcher, replacer } of this.aliases) {
            const result = matcher.exec(path);
            if (!result)
                continue;
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
    getAliasesForWebpack() {
        const aliases = {};
        for (const { alias, replacer } of this.aliases) {
            const aliasForFolder = alias.endsWith('/*');
            const property = aliasForFolder ? alias.slice(0, -2) : alias;
            if (property in aliases && !aliasForFolder)
                continue;
            aliases[property] = this.resolvePath(replacer);
        }
        return aliases;
    }
}

export { AliasesFromTSConfig, AliasesFromTSConfig as default };
//# sourceMappingURL=index.mjs.map
