# `build`

> Run all tasks to build the project into `./test_build`.

**`grunt build`**

Tasks can be added to the list by hooking a filter function into `tasks.build.tasks`. The default task list is populated in `wp-dev-env-grunt/grunt/hooked/addDefaultBuildTasks.js`. See [for customization](../Guide/grunt_taskrunner.html#customization).

??? include the task list

### `copy` and `string-replace`

Instead of `copy`, the `string-replace` task is used for `php` files.

Certain patterns, prefixed with `wde_replace_`, will be replaced.
Possible to use are all keys with string value inside `package.json`.

## Options

### `[--compress="true"]`

JavaScript and styles will be compressed and no debug info or source maps are created.