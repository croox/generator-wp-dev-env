# generator-wp-dev-env [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Yeoman generator for scaffolding a Grunt based WordPress Plugin &amp; Theme dev environment

- Generates a project structure, organized in `./src`, `./test_build` and `./dist` see ???.
  - `./src` contains the source code.

  - `./test_build` contains the current build of the project. May be synchronized with a local or remote WordPress installation.

  - `./dist` contains releases and has the same structured as the WordPress plugin/theme svn repository.
- `grunt` is used to automate processes and run repetitive tasks, see ???.
  - It may watch file changes in `./src` and performs the required tasks to update the `./test_build` directory and optionally syncs it to a WordPress installation on a local or remote system.

- Generates releases with readme that adheres to the [WordPress plugin readme file standard](https://wordpress.org/plugins/developers/#readme), a Changelog based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
- Uses `git` and creates tags and releases with description and assets automatically.
- Generated projects are ready to be used with [github-updater](https://github.com/afragen/github-updater).
- Ready for development with ES6 and [React.js](https://reactjs.org/).
- Subgenerators to create Assets,  Custom Post Types, Gutenberg Blocks and to add Composer Package.

This package is part of the `wp-dev-env` tool set to develop WordPress Plugins and Themes.

Packages:

- [`generator-wp-dev-env`](https://github.com/croox/generator-wp-dev-env)

  Yeoman generator to initialize the project and add new components.

- [`wp-dev-env-grunt`](https://github.com/croox/wp-dev-env-grunt)

  Configures and registers the built in grunt tasks.

- [`wp-dev-env-frame`](https://github.com/croox/wp-dev-env-frame)

  The `php` frame. Contains base classes and utilities.

## Dependencies

We assume you have pre-installed [node.js](https://nodejs.org/) and [npm.js](http://npmjs.com/)

- `yo` tested version `4.3.0` [Yeoman](http://yeoman.io)
- `composer` tested version `2.1.8`
- `git` tested version `2.7.4`
- `grunt` tested version `1.4.1` and `grunt-cli`
- `rsync` tested version `3.1.2`
- `convert` from ImageMagick. Tested with ImageMagick `6.8.9-9`

All dependencies must be accessible from cli via their respective command. To test this, run something like: `composer --version` or `which composer` ...

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wp-dev-env using [npm](https://www.npmjs.com/)

```bash
# First, install Yeoman globally
npm install -g yo

# Install `generator-wp-dev-env` globally from github repository
npm install -g git+ssh://git@github.com/croox/generator-wp-dev-env
```

## Usage

```bash
# To generate a new plugin or theme, create a new directory
mkdir -p ~/path/to/myproject

# Make it your working directory
cd ~/path/to/myproject

# (recommended) Set up remote origin, so the upstream can be set during project generation.

# Run the generator and follow the prompts to create a new theme/plugin
yo wp-dev-env

# Run the generator again to create new custom-post-types, scripts, styles, blocks ...
yo wp-dev-env

# List available grunt tasks
grunt
```

### Documentation

Available as docset:

- [generator-wp-dev-env.docset.tar](https://github.com/croox/generator-wp-dev-env/raw/master/docs/generator-wp-dev-env.docset.tar)
- [generator-wp-dev-env.docset.tgz](https://github.com/croox/generator-wp-dev-env/raw/master/docs/generator-wp-dev-env.docset.tgz)
- [generator-wp-dev-env.docset.zip](https://github.com/croox/generator-wp-dev-env/raw/master/docs/generator-wp-dev-env.docset.zip)

Each directory of a generated project contains a `readme.md`. The documentation is partly generated from those files.

To browse the docset documentation use [Zeal](https://zealdocs.org/) for Linux and Windows or [Dash](https://kapeli.com/dash) for macOS or iOS.

Alternatively browse the docset [html source on GitHub directly](https://github.com/croox/generator-wp-dev-env/tree/master/docs/generator-wp-dev-env.docset/Contents/Resources/Documents) or [preview the html source](https://htmlpreview.github.io/?https://github.com/croox/generator-wp-dev-env/blob/master/docs/generator-wp-dev-env.docset/Contents/Resources/Documents/Guide/installation_quick_start.html).

## License

GPL-3.0 [croox](https://github.com/croox)

[npm-image]: https://badge.fury.io/js/generator-wp-dev-env.svg
[npm-url]: https://npmjs.org/package/generator-wp-dev-env
[travis-image]: https://travis-ci.org/croox/generator-wp-dev-env.svg?branch=master
[travis-url]: https://travis-ci.org/croox/generator-wp-dev-env
[daviddm-image]: https://david-dm.org/croox/generator-wp-dev-env.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/croox/generator-wp-dev-env
