# generator-wp-dev-env [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Yeoman generator for scaffolding a Grunt based WordPress Plugin &amp; Theme dev environment

- Generates a project structure, organized in `./src`, `./test_build` and `./dist` see ???.
-- `./src` contains the source code.
-- `./test_build` contains the current build of the project. May be synchronized with a local or remote WordPress installation.
-- `./dist` contains releases and has the same structured as the WordPress plugin/theme svn repository.
- `grunt` is used to automate processes and run repetitive tasks, see ???.
-- It may watch file changes in `./src` and performs the required tasks to update the `./test_build` directory and optionally syncs it to a WordPress installation on a local or remote system.
-- Tasks for code linting, formatting and applying [WordPress coding standards](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards).
- Generates releases with readme that adheres to the [WordPress plugin readme file standard](https://wordpress.org/plugins/developers/#readme), a Changelog based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
- Uses `git` and creates tags and releases with description and assets automatically.
- Generated projects are ready to be used with [github-updater](https://github.com/afragen/github-updater).
- Ready for development with ES6 and [React.js](https://reactjs.org/).
- Subgenerators to create Assets,  Custom Post Types, Gutenberg Blocks and to add Composer Package.

## Dependencies


We assume you have pre-installed [node.js](https://nodejs.org/) and [npm.js](http://npmjs.com/)

- `yo` tested version `2.0.5` [Yeoman](http://yeoman.io)
- `composer` tested version `1.2.2`
- `git` tested version `2.7.4`
- `grunt` tested version `1.0.4` and `grunt-cli`
- `sass` tested version `3.4.22`
- `rsync` tested version `3.1.2`
- `xgettext` tested version `0.19.7`

All dependencies must be accessible from cli via their respective command. To test this, run something like: `composer --version` or `which composer` ...

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wp-dev-env using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
# First, install Yeoman globally
npm install -g yo

# Install `generator-wp-dev-env` globally from github repository
npm install -g https://github.com/croox/generator-wp-dev-env

# Generate your new plugin or theme
yo wp-dev-env
```

## Usage

```bash
# To generate a new plugin or theme, create a new directory
mkdir -p ~/path/to/myproject

# Make it your working directory
cd ~/path/to/myproject

# Run the generator and follow the prompts
yo wp-dev-env
```

### Project Structure

Generated Plugins and Themes share the same structure. So code can be used in both kind of projects in a similar way.

A new generated plugin `testing` with prefix/textdomain `test` looks similar to the following.

.
├── .git
│   └── [...]
├── grunt
│   ├── readme.md
│   └── [...]
├── node_modules
│   └── [...]
├── releases
│   ├── readme.md
│   └── [...]
├── src
│   ├── classes
│   │   ├── readme.md
│   │   └── Test.php
│   ├── [fonts](./generators/app/templates/src/fonts/readme.md)
│   │   └── readme.md
│   ├── [images](./generators/app/templates/src/images/readme.md)
│   │   └── readme.md
│   ├── [inc](./generators/app/templates/src/inc/readme.md)
│   │   ├── fun
│   │   │   └── readme.md
│   │   ├── post_types_taxs
│   │   │   └── readme.md
│   │   ├── roles_capabilities
│   │   │   └── readme.md
│   │   ├── template_functions
│   │   │   └── readme.md
│   │   ├── template_tags
│   │   │   └── readme.md
│   │   └── readme.md
│   ├── [js](./generators/app/templates/src/js/readme.md)
│   │   └── readme.md
│   ├── [languages](./generators/app/templates/src/languages/readme.md)
│   │   ├── readme.md
│   │   └── test-LOCALE.pot
│   ├── [scss](./generators/app/templates/src/scss/readme.md)
│   │   ├── readme.md
│   │   └── test_frontend.scss
│   ├── [templates](./generators/app/templates/src/templates/readme.md)
│   │   └── readme.md
│   ├── readme.txt
│   └── testing.php
├── test_build
│   └── [...]
├── vendor
│   └── [...]
├── CHANGELOG.md
├── composer.json
├── .gitignore
├── Gruntfile.js
├── package.json
├── README.md
├── testing.php
├── wde_wp_installs-sample.json
└── [...]

> #### Readme
>
> Each directory should contains `readme.md` file with information concerning the task runner. How to use this directory during development and how the directory is treated by the certain tasks like `build`, `watch` or `dist`.
>
- All lowercase `readme.md` files contain information concerning the task runner.
- Uppercase `./README.md` describes the repository itself.
- `./src/readme.txt` will be used to generate the WordPress Plugin/Theme `readme.txt` and a corresponding mardown `README.md`.

### Grunt tasks ???

## License

GPL-3.0 © [croox](https://github.com/croox)


[npm-image]: https://badge.fury.io/js/generator-wp-dev-env.svg
[npm-url]: https://npmjs.org/package/generator-wp-dev-env
[travis-image]: https://travis-ci.org/croox/generator-wp-dev-env.svg?branch=master
[travis-url]: https://travis-ci.org/croox/generator-wp-dev-env
[daviddm-image]: https://david-dm.org/croox/generator-wp-dev-env.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/croox/generator-wp-dev-env
