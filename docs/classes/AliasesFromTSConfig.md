[Aliases from `tsconfig.json`](../README.md) / AliasesFromTSConfig

# Class: AliasesFromTSConfig

## Table of contents

### Constructors

- [constructor](AliasesFromTSConfig.md#constructor)

### Properties

- [aliases](AliasesFromTSConfig.md#aliases)
- [baseUrl](AliasesFromTSConfig.md#baseurl)
- [tsconfigPath](AliasesFromTSConfig.md#tsconfigpath)

### Methods

- [apply](AliasesFromTSConfig.md#apply)
- [getAliasesForWebpack](AliasesFromTSConfig.md#getaliasesforwebpack)
- [hasAlias](AliasesFromTSConfig.md#hasalias)
- [resolvePath](AliasesFromTSConfig.md#resolvepath)

## Constructors

### constructor

• **new AliasesFromTSConfig**(`tsconfigPath`): [`AliasesFromTSConfig`](AliasesFromTSConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsconfigPath` | `string` |

#### Returns

[`AliasesFromTSConfig`](AliasesFromTSConfig.md)

#### Defined in

[AliasesFromTSConfig.ts:46](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L46)

## Properties

### aliases

• `Private` **aliases**: \{ `alias`: `string` ; `matcher`: `RegExp` ; `replacer`: `string`  }[]

#### Defined in

[AliasesFromTSConfig.ts:38](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L38)

___

### baseUrl

• `Private` **baseUrl**: `string`

#### Defined in

[AliasesFromTSConfig.ts:36](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L36)

___

### tsconfigPath

• `Private` **tsconfigPath**: `string`

#### Defined in

[AliasesFromTSConfig.ts:44](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L44)

## Methods

### apply

▸ **apply**(`path`): `string`

Replaces the alias from jsconfig/tsconfig.json with the correct path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[AliasesFromTSConfig.ts:79](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L79)

___

### getAliasesForWebpack

▸ **getAliasesForWebpack**(): [`AliasesForWebpack`](../README.md#aliasesforwebpack)

Gets an object with the aliases as properties and paths as values.

#### Returns

[`AliasesForWebpack`](../README.md#aliasesforwebpack)

**`Example`**

```js
// webpack.config.js

const aliasesFromTSConfig = new AliasesFromTSConfig('./tsconfig.json');

module.exports = {
  resolve: {
    alias: aliasesFromTSConfig.getAliasesForWebpack(),
    // ...
  },
  // ...
};
```

#### Defined in

[AliasesFromTSConfig.ts:111](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L111)

___

### hasAlias

▸ **hasAlias**(`path`): `boolean`

Checks if received path contains an alias from jsconfig/tsconfig.json.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`boolean`

#### Defined in

[AliasesFromTSConfig.ts:74](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L74)

___

### resolvePath

▸ **resolvePath**(`path`): `string`

Resolves received path joining tsconfigPath's dirname and the baseUrl.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[AliasesFromTSConfig.ts:69](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L69)
