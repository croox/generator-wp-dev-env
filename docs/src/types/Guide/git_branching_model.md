# Git branching model

The branching model is inspired by [Vincent Driessen's blog post on nvie.com](https://nvie.com/posts/a-successful-git-branching-model/).

The following explanation summarizes this blog post and highlights some customization.

The repository, defined during initial project generation, is considered being a "central" repository and the source of "truth". Each developer pulls and pushes to this repository. We will refer to this repository as `origin`.

## Branches summary

The repository constist of three mandatory branches and several temporary supporting branches.
To release the project a `release-*` branch is mandatory.

### The main branches

The central repository holds three main branches with an infinite lifetime:

- master
- develop
- generated

#### master

The `origin/master` branch is considered to be the main branch where the source code of `HEAD` always reflects the latest release.
The source code of this branch should not be edited manually.

#### develop

The `origin/develop` branch is considered to be the main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release.

Features and fixes are developed in individual temporary branches and integrated into the `origin/develop` branch. We will refer to those branches as "Supporting branches".

When the source code in this branch reaches a stable point and is ready to be released, all of the changes should be merged into a `release-` branch, to be ready to run the `grunt dist` task to release a new version from that `release-` branch.

#### generated

The source code of `origin/generated` branch should not be edited manually. It reflects the state of a fresh generated project without changes.

This branch is created during initial project generation and updated when the project gets regenerated.

The purpose of this branch is to prepare a base to update the project to a new generator version.

On regeneration (run `yo` and choose to "Regenerate Project") the project gets generated with the same input parameter but uses the templates from the current globally installed `generator-wp-dev-env`. Once the `generated` branch is updated, the changes should be merged manually into the `develop` branch.

### Supporting branches

Next to the main branches, a variety of supporting branches are used to aid parallel development.
Each of this branches has a specific purpose like developing a certain feature or fix an issue.
These branches always have a limited life time, since they will be removed eventually.

A supporting branch is bound to strict rules as to which branch it is originating from and which branch is it will be merged into.

See [Vincent Driessen's blog post](https://nvie.com/posts/a-successful-git-branching-model/#supporting-branches) for a detailed explanation about that concept and how to work with that model.

It is up to the development team to determine to what extent it makes use of supporting branches. Only the main branches and at least on `release-*` branch are mandatory.

#### `release-*`

At least one `release-*` branch is mandatory. Because **new versions can only be released from a `release-*` branch**.
The [`grunt dist`](../Command/dist.html) task will perform all necessary steps.

## Example workflow

### Start the project

```bash
# (recommended) Set up remote origin to use it during project generation.

# Generate a new project.
yo wp-dev-env

# If origin was given, upstream for `master`, `develop` and `generated` branches is set.

# The current branch is `develop`.
```

### Creating a feature

```bash
# Create a feature branch from the `develop` branch
git checkout -b feature-something develop

# Do some dev work, for example run the generator again
yo wp-dev-env

# Document your changes to be used in e.g. changelog later
grunt addchange

# Stage changes and commit
git add --all
git commit

# Switch back to the `develop` branch
git checkout develop

# Merge the feature branch into `develop`
git merge --no-ff feature-something

# Optionally delete feature branch
git branch -d feature-something

# And now? Go on to release ...
```

### Creating a release

```bash
# Create a release branch from the `develop` branch.
git checkout -b release-something develop

# Do some tests and fixes.

# Start the dist task.
# If remote is set, task may push to `master` and `develop`
# and create a release.
grunt dist

# Optionally delete release branch.
git branch -d release-something
```

### Creating a Hotfix

???