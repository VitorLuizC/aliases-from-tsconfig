[Aliases from `tsconfig.json`](../README.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [aliases](default.md#aliases)
- [baseUrl](default.md#baseurl)

### Methods

- [apply](default.md#apply)
- [hasAlias](default.md#hasalias)

## Constructors

### constructor

• **new default**(`tsconfigPath`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsconfigPath` | `string` |

#### Defined in

[AliasesFromTSConfig.ts:12](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/aeed6a7/src/AliasesFromTSConfig.ts#L12)

## Properties

### aliases

• `Private` **aliases**: { `matcher`: `RegExp` ; `replacer`: `string`  }[]

#### Defined in

[AliasesFromTSConfig.ts:7](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/aeed6a7/src/AliasesFromTSConfig.ts#L7)

___

### baseUrl

• `Private` **baseUrl**: `string`

#### Defined in

[AliasesFromTSConfig.ts:5](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/aeed6a7/src/AliasesFromTSConfig.ts#L5)

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

[AliasesFromTSConfig.ts:39](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/aeed6a7/src/AliasesFromTSConfig.ts#L39)

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

[AliasesFromTSConfig.ts:34](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/aeed6a7/src/AliasesFromTSConfig.ts#L34)
