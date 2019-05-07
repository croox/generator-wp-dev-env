# Conventions & Guidelines

## Readme

### Lowercase `readme.md`

All lowercase `readme.md` files contain dev information.

- How to use this directory during development.

- How the directory is treated by certain tasks like `build`, `watch` or `dist`.

- **Each directory should contain `readme.md` file.**

- The directory structure documentation is generated from those `readme.md` files.

### Uppercase `./README.md

The Uppercase `./README.md` in the project root describes the repository itself.

### WordPress Plugin/Theme readme

`./src/readme.txt` is used to generate the WordPress Plugin/Theme readme into `./test_build/readme.txt`.

- A markdown copy will be added automatically in `./test_build/README.md`.


## Prefixes

The projects function prefix is set during initialization. It is stored as `funcPrefix` in `package.json`.

Almost all `js` and `php` files in `./src` should be prefixed. Exceptions are the plugin-main-file???, `./src/classes/*` (because they use namespaces) and any necessary weird custom krimskrams??? link???

Some project files use `wde_` as prefix (`wp-dev-env`). For example [wde_wp_installs.json](./wde_wp_installs.json.html)
