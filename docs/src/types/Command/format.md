# `format`

> Run all formatting tasks.

**`grunt format:<extensions>`**

## Arguments

### `[:<extensions>]`

Comma separated list of file extensions. Accepted: `php`, `js`, `jsx`, `scss` and `md`.
If nothing specified tasks for all extensions will run.

The [`phpcs`](./phpcs.html) task is used to format `php`. All other source files are formatted using the [`prettier`](./prettier.html) task.
