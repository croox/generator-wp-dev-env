## `./src/js`

This directory contains `js` files and subdirectories with `js` files.

Bundles will be generated for files within `./src/js` (not recursively).
This files can be seen as entry points that `import` files from subdirectories.

> Ready to code in ES6 and [React.js](???).
Thanks to [browserify](???) and [babelify](???).

Some global variables are shimed in order to be used within the script.
It means that scripts enqueued earlier by WordPress are available as a module.
For Example: If the script is enqueued by WordPress with `jquery` as dependency, access it like this:
```js
import $ from 'jquery';
console.log( 'this is jquery: ', $ );
```
WordPress highly recommends to use scripts already registered by WordPress, instead of using your own version of jquery, react or what ever.
See [wp_register_script](https://developer.wordpress.org/reference/functions/wp_register_script/#core-registered-scripts) for detailed list of registered scripts.

### What happens on `build` and `dist`

Linting and browserifying.
On `dist` (or if task run with `--compress="true"`) the destination files are compressed.

Generating pot `files` ???

### What happens on `watch`

Same same like `build` but not all files are processed at all.

If a file changes directly within `./src/js`, the bundle will be created only for that certain file (and of course everything that is `import`ed/`require`d).

If a file changes within a subdirectory, the bundle will be created for the file that is named equally to the subdirectory.
For example, if `./src/js/prefix_super_script/**/*.js` changes, a bundle will be created for `./src/js/prefix_super_script.js` only.