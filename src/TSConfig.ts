export type TSConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: {
      [path: string]: [string, ...string[]];
    };
  };
};
