# Project Structure

Generated Plugins and Themes share the same directory structure. So code can be used in both kind of projects in a similar way.

@include::project_structure_tree

## Directory Documentation

Each directory contains a `readme.md` file concerning dev information.
*See [Conventions & Guidelines](./conventions_guidelines.html#readme) for different types of readme*.

The directory structure documentation is generated from those `readme.md` files.
*See ???*

## Git branching model

The branching model is inspired by [Vincent Driessen's blog post on nvie.com](https://nvie.com/posts/a-successful-git-branching-model/).

The following explanation summarizes this blog post and highlights some customization.

The repository, defined during initial project generation, is considered being a "central" repository and the source of "truth". Each developer pulls and pushes to this repository. We will refer to this repository as `origin`.

### The main branches

The central repository holds three main branches with an infinite lifetime:

- master
- dev
- generated

#### master

The `origin/master` branch is considered to be the main branch where the source code of `HEAD` always reflects a state ready to be released or the latest release.

**New versions can only be released from the `origin/master` branch**. The [`grunt dist`](../Command/dist.html) task will perform all necessary steps.

#### dev

The `origin/dev` branch is considered to be the main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release.

Features and fixes are developed in individual temporary branches and integrated into the `origin/dev` branch. We will refer to those branches as "Supporting branches".

When the source code in this branch reaches a stable point and is ready to be released, all of the changes should be merged back into `master`, to be ready to run the `grunt dist` task to release a new version from the `master` branch.

#### generated

The source code of `origin/generated` branch should not be edited manually. It reflects the state of a fresh generated project without changes.

This branch is created during initial project generation and updated when the project gets regenerated.

The purpose of this branch is to prepare a base to update the project to a new generator version.

On regeneration (run `yo` and choose to "Regenerate Project") the project gets generated with the same input parameter but uses the templates from the current globally installed `generator-wp-dev-env`. Once the `generated` branch is updated, the changes should be merged manually into the `dev` branch.

### Supporting branches

Next to the main branches, a variety of supporting branches are used to aid parallel development.
Each of this branches has a specific purpose like developing a certain feature or fix an issue.
These branches always have a limited life time, since they will be removed eventually.

A supporting branch is bound to strict rules as to which branch it is originating from and which branch is it will be merged into.

See [Vincent Driessen's blog post](https://nvie.com/posts/a-successful-git-branching-model/#supporting-branches) for a detailed explanation about that concept and how to work with that model.

It is up to the development team to determine to what extent it makes use of supporting branches. Only the main branches are mandatory.
