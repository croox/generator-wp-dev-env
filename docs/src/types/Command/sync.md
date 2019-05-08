# `grunt sync`

> Syncs the plugin to a destination specified in `wde_wp_installs.json`.

**`grunt sync:<destination>[:<version>]`**

## Description

Syncs the plugin to a destination specified in `wde_wp_installs.json`.
**Deletes** files on destination, if not present in source!

usiung rsync ???

??? how to pass argument to rsync ???

## Arguments

### `:<destination>`

Comma separated list of destinations specified in `wde_wp_installs.json`.

#### `[:<version>]`

String to specify sync source. Defaults to `test_build`.

- `test_build` uses `./test_build/` as source.
- `trunk` uses `./dist/trunk/` as source.
- `<version>` uses `./dist/tag/<version>/` as source.
  
  The `./dist/tag/` directory is not tracked by git. It is created on `dist` task. So the specific version directory will not be existing when repository is cloned. 
