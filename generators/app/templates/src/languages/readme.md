## `./src/languages`

This directory contains `pot` and `po`.

`css` files will be generated for files within `./src/languages` (not recursively).
Those files can be seen as entry points that `@import` modules (~files) from subdirectories.

### pot files generation

The last build step generates `pot` files into `./src/languages` (hooked into build in 70).

A single `pot` file is generated for translatable strings within all `php` files.

An individual `pot` file is generated for each file in `./src/js`. See [./src/js/readme.md](???).
See [@wordpress/i18n](https://wordpress.org/gutenberg/handbook/packages/packages-i18n/) for internationalization utilities for client-side localization.

### mo file generation

The last build step generates `mo` files from `pot` into `./test_build/languages` (hooked into build in 70).

The project base class loads the `mo` file automatically.

### json file generation

The last build step generates `json` files from `pot` into `./test_build/languages` (hooked into build in 70).

The `json` can be used like `wp_set_script_translations( $handle, 'textDomain', prefix\Prefix::get_instance()->dir_path . 'languages' );`.

> Use `yo wp-dev-env` to generate assets ready to be used with `@wordpress/i18n` utilities.

### What happens on `watch`

If `./src/languages/*.pot` changes, all `mo` and `json` files will be generated into `./test_build/languages`.

Nothing for `pot` files. `pot` files can be generated with `pot` task and are automatically generated on `build` and `dist`.