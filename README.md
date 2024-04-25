# Aliases from `tsconfig.json`

[![Continuous Integrations](https://github.com/VitorLuizC/aliases-from-tsconfig/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/VitorLuizC/aliases-from-tsconfig/actions/workflows/continuous-integrations.yaml)
[![License](https://badgen.net/github/license/VitorLuizC/aliases-from-tsconfig)](./LICENSE)

Reads a jsconfig/tsconfig.json baseUrl and paths and provides a method to replace its aliases in your files paths.

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install aliases-from-tsconfig --save

# For Yarn, use the command below.
yarn add aliases-from-tsconfig
```

## Usage for Custom Implementations

Create an `AliasesFromTSConfig` instance with the path to your jsconfig/tsconfig.json, and use its methods to check if the file's path has an alias or to apply the alias.

```js
import AliasesFromTSConfig from 'aliases-from-tsconfig';

const aliases = new AliasesFromTSConfig('./tsconfig.json');

aliases.apply('@/components/Button/ButtonGhost.js');
//=> './app/assets/components/Button/ButtonGhost.js'

function processFilePath(path) {
  if (aliases.hasAlias(path)) {
    console.log(`The file path "${path}" has an alias from tsconfig.json.`);
  }

  return aliases.apply(path);
}
```

## Usage with Webpack

Create an instance of `AliasesFromTSConfig` using the path to your `tsconfig.json` as argument, and then call the method `getAliasesForWebpack` to get the correct alias configuration for webpack.

```js
// configuration/webpack.config.mjs
import AliasesFromTSConfig from 'aliases-from-tsconfig';


const aliases = new AliasesFromTSConfig('../jsconfig.json');

export default {
  resolve: {
    alias: aliases.getAliasesForWebpack(),
    // ...
  },
  // ...
};
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
