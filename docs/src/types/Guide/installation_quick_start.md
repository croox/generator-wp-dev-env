# Installation & Quick Start

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

instalation 

First, install [Yeoman](http://yeoman.io) and generator-wp-dev-env using [npm](https://www.npmjs.com/)

```bash
# First, install Yeoman globally
npm install -g yo

# Install `generator-wp-dev-env` globally from github repository
npm install -g https://github.com/croox/generator-wp-dev-env

# Generate your new plugin or theme
yo wp-dev-env
```

## Start a new Project

```bash
# To generate a new plugin or theme, create a new directory
mkdir -p ~/path/to/myproject

# Make it your working directory
cd ~/path/to/myproject

# Run the generator and follow the prompts
yo wp-dev-env
```

## Project Structure

Generated Plugins and Themes share the same directory structure. So code can be used in both kind of projects in a similar way.

@include::project_structure_tree

> Check the [Project Structure](./project_structure.html) page for details
