## `./src`

Contains the source code.

### What happens on `build`, `watch` and `dist`

> Note: Following directories are exceptions. Check their docs.
>
> - `classes`
- `fonts`
- `images`
- `inc`
- `js`
- `languages`
- `scss`
- `templates` (only themes)
>
> The themes `functions.php` or the plugins main file are specially treated as well.

#### Copy and string-replace

All subdirectories and files are copied into the corresponding destination directory. E.g.: `./src/custom_dir_to_include/*` will be copied to `./test_build/custom_dir_to_include`.

For all `php` files, certain patterns will be replaced. See [`build`](../Task/build.html#copy-and-string-replace).
