declare class AliasesFromTSConfig {
    private baseUrl;
    private aliases;
    constructor(tsconfigPath: string);
    /** Checks if received path contains an alias from jsconfig/tsconfig.json. */
    hasAlias(path: string): boolean;
    /** Replaces the alias from jsconfig/tsconfig.json with the correct path. */
    apply(path: string): string;
}
export default AliasesFromTSConfig;
//# sourceMappingURL=AliasesFromTSConfig.d.ts.map