# Aliases from `tsconfig.json`

[![Continuous Integrations](https://github.com/VitorLuizC/aliases-from-tsconfig/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/VitorLuizC/aliases-from-tsconfig/actions/workflows/continuous-integrations.yaml)
[![License](https://badgen.net/github/license/VitorLuizC/aliases-from-tsconfig)](./LICENSE)

Reads a jsconfig/tsconfig.json baseUrl and paths and provides a methods to replace its aliases in your files paths.

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install aliases-from-tsconfig --save

# For Yarn, use the command below.
yarn add aliases-from-tsconfig
```

## Usage

Create an `AliasesFromTSConfig` instance with the path to your jsconfig/tsconfig.json, use its methods to check if file's path has an alias or to apply the alias.

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


## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
