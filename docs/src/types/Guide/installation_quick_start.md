# Installation & Quick Start

This package is part of the `wp-dev-env` tool set to develop WordPress Plugins and Themes.

Packages:

- [`generator-wp-dev-env`](https://github.com/croox/generator-wp-dev-env)

  Yeoman generator to initialize the project and add new components.

- [`wp-dev-env-grunt`](https://github.com/croox/wp-dev-env-grunt)

  Configures and registers the built in grunt tasks. See the [Grunt Taskrunner](./grunt_taskrunner.html).

- [`wp-dev-env-frame`](https://github.com/croox/wp-dev-env-frame)

  The `php` frame. Contains base classes and utilities.

## Dependencies

We assume you have pre-installed [node.js](https://nodejs.org/) and [npm.js](http://npmjs.com/)

- `yo` tested version `2.0.5` [Yeoman](http://yeoman.io)
- `composer` tested version `1.2.2`
- `git` tested version `2.7.4`
- `grunt` tested version `1.0.4` and `grunt-cli`
- `rsync` tested version `3.1.2`
- `xgettext` tested version `0.19.7`
- `convert` from ImageMagick. Tested with ImageMagick `6.8.9-9`

All dependencies must be accessible from CLI via their respective command. To test this, run something like: `composer --version` or `which composer` ...

### Repository hosting

Currently it is recommended to use [GitHub](https://github.com/) to host the repository. Because by now only the GitHub API is supported to create releases.

It is **important** to connect to the repository host via SSH. *[How to connect to GitHub via SSH](https://help.github.com/en/articles/connecting-to-github-with-ssh)*.

An `ssh-agent` can be used to avoid typing the passphrase several times. *[zsh](https://ohmyz.sh/) users may use the [ssh-agent plugin](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/ssh-agent)*.

To set the upstream during project generation, the remote origin has to be [created](https://github.com/new) before generating a new project. It is **important** that the remote repository is empty and doesn't contain any files (no `README.md`, `.gitignore`, ...) during project generation.

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-wp-dev-env` using [npm](https://www.npmjs.com/)

```bash
# First, install Yeoman globally
npm install -g yo

# Install `generator-wp-dev-env` globally from github repository
npm install -g https://github.com/croox/generator-wp-dev-env

```

## Start a new Project

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

`generator-wp-dev-env` includes several subgenerators. All of those subgenerators should not be called directly, instead they can be chosen when running the main generator `yo wp-dev-env`. This approach differs from the default CLI usage of yeoman.

### Generator Options

- `--verbose`
Display a more verbose output.

- `--skipValidate=<fieldName,otherFieldName,...>`
Skip the form validation for certain fields. The Option accepts a comma separated list of fieldNames.
Example to generate a project and allow capital letters in project-slug: `yo wp-dev-env --skip-validate="name"`.

## Git branching model

Projects are setup to be used with a certain branching model.

> Check the [Git Branching Model](./git_branching_model.html) page for details.

## Project Structure

Generated Plugins and Themes share the same directory structure. So code can be used in both kind of projects in a similar way.

@include::project_structure_tree

> Check the [Project Structure](./project_structure.html) page for details.

## Grunt Taskrunner

[Grunt](http://gruntjs.com/) is used to automate processes and perform repetitive tasks.

The basic setup is handled by `wp-dev-env-grunt` package. The projects `Gruntfile.js` imports and executes a function that configures and registers the built in tasks.

> See the [Grunt Taskrunner](./grunt_taskrunner.html) page for details and customization
