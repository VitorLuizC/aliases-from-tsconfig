Aliases from `tsconfig.json`

# Aliases from `tsconfig.json`

## Table of contents

### References

- [default](README.md#default)

### Classes

- [AliasesFromTSConfig](classes/AliasesFromTSConfig.md)

### Type Aliases

- [AliasesForWebpack](README.md#aliasesforwebpack)

## References

### default

Renames and re-exports [AliasesFromTSConfig](classes/AliasesFromTSConfig.md)

## Type Aliases

### AliasesForWebpack

Ƭ **AliasesForWebpack**: `Object`

An object with the aliases as property keys and paths as its values.

**`Example`**

For this given `jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "./app",
    "paths": {
      "@": ["src/index.mjs"],
      "@/*": ["src/*"],
      "@ui/*": ["src/components/ui/*"]
    }
  }
}
```
It would be something like this object:
```js
{
  '@': '/home/user/projects/example/app/src',
  '@ui': '/home/user/projects/example/app/src/components/ui'
}
```

#### Index signature

▪ [alias: `string`]: `string`

#### Defined in

[AliasesFromTSConfig.ts:31](https://github.com/VitorLuizC/aliases-from-tsconfig/blob/58c10c2dee71352c15e80800a4609b6b967f7dee/src/AliasesFromTSConfig.ts#L31)
