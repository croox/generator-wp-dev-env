# `phpcs`

> Run `PHP_CodeSniffer` to lint or format code in `./src` using WordPress coding standards.

**`grunt phpcs[:<script>][:<extensions>]`**

## Arguments

### `[:<script>]`

Can be `lint` or `format`. Defaults to `lint`.

- `lint` runs the `phpcs` script to detect violations against the WordPress coding standards.
- `format` runs the `phpcbf` script to fix many errors and warnings automatically.

### `[:<extensions>]`

Comma separated list of file extensions. Default: `php`.

The [`prettier`](./prettier.html) task is generally used for formatting other source files. 
