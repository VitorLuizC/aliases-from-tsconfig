/*!
 * aliases-from-tsconfig v0.1.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var node_path = require('node:path');
var node_fs = require('node:fs');

class AliasesFromTSConfig {
    constructor(tsconfigPath) {
        var _a, _b;
        const jsonWithComments = node_fs.readFileSync(tsconfigPath, 'utf-8');
        const json = jsonWithComments.replace(/\/\/[^\n]*\n/g, '\n');
        const config = JSON.parse(json);
        const paths = (_a = config.compilerOptions.paths) !== null && _a !== void 0 ? _a : {};
        this.baseUrl = (_b = config.compilerOptions.baseUrl) !== null && _b !== void 0 ? _b : '.';
        this.aliases = Object.entries(paths).map(([alias, locations]) => {
            var _a, _b;
            const group = `(?:${alias.replace(/\*$/, '').replace(/\W/g, '\\$&')})`;
            return {
                matcher: new RegExp(`^${group}${alias.endsWith('*') ? '(.*)' : ''}$`),
                replacer: (_b = (_a = locations[0]) === null || _a === void 0 ? void 0 : _a.replace(/\/\*$/, '')) !== null && _b !== void 0 ? _b : '',
            };
        });
    }
    /** Checks if received path contains an alias from jsconfig/tsconfig.json. */
    hasAlias(path) {
        return this.aliases.some((alias) => alias.matcher.test(path));
    }
    /** Replaces the alias from jsconfig/tsconfig.json with the correct path. */
    apply(path) {
        var _a;
        for (const { matcher, replacer } of this.aliases) {
            const result = matcher.exec(path);
            if (!result)
                continue;
            const pathWithoutAlias = (_a = result[1]) !== null && _a !== void 0 ? _a : '';
            return node_path.join(this.baseUrl, replacer, pathWithoutAlias);
        }
        return path;
    }
}

exports["default"] = AliasesFromTSConfig;
//# sourceMappingURL=index.js.map
