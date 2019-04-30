
[README](../../../../../README.md)\
└── [src](../readme.md)\
    └── scss\

## `./src/scss`

This directory contains `scss` files and subdirectories with `scss` files.

`css` files will be generated for files within `./src/scss` (not recursivly).
This files can be seen as entry points that `@import` files from subdirectories.

### What happens on `build` and `dist`

Creates `css` files.

On `build` the style is pretty expanded and source-maps are created.
On `dist` (or if task run with `--compress="true"`) the destination files are compressed and don't contain a source-map.

### What happens on `watch`

Same same like `build` but not all files are processed at all.

If a file changes directly within `./src/scss`, the bundle will be created only for that certain file (and of course everything that is `@import`ed).

If a file changes within a subdirectory, the target file will be created for the file that is named equaly to the subdirectory.
For example, if `./src/scss/prefix_super_script/**/*.scss` changes, a css file will be created for `./src/scss/prefix_super_script.scss` only.

### Don't name it style

Please don't name the entry file `./src/scss/style.scss`. Because this name is reserved and used for the themes `style.css`.


??? todo, how to load paths from node modules