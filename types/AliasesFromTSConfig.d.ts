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
declare class AliasesFromTSConfig {
    private baseUrl;
    private aliases;
    private tsconfigPath;
    constructor(tsconfigPath: string);
    /** Resolves received path joining tsconfigPath's dirname and the baseUrl. */
    private resolvePath;
    /** Checks if received path contains an alias from jsconfig/tsconfig.json. */
    hasAlias(path: string): boolean;
    /** Replaces the alias from jsconfig/tsconfig.json with the correct path. */
    apply(path: string): string;
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
    getAliasesForWebpack(): AliasesForWebpack;
}
export default AliasesFromTSConfig;
//# sourceMappingURL=AliasesFromTSConfig.d.ts.map