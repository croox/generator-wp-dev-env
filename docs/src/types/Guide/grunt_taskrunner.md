# Grunt Taskrunner

[Grunt](http://gruntjs.com/) is used to automate processes and perform repetitive tasks.

The basic setup is handled by `wp-dev-env-grunt` package. The projects `Gruntfile.js` imports and executes a function that configures and registers the built in tasks.

## Built in tasks

@include::task_list

## Customization

[@wordpress/hooks](https://www.npmjs.com/package/@wordpress/hooks) is used to create action and filter hooks.

Hooked function can be added to `./grunt/hooked/` ???link. Each file should export a function named equally to the files basename, containing one or more hooked functions.

### Filter

Every built in grunt task configuration is filterable. As well as some options, replacements and more. Following lists all built in filter:

@include::filter_list

### Actions

Following lists all built in actions:

@include::action_list
