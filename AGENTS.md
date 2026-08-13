# AGENTS.md

Yeoman generator scaffolding grunt-based WordPress plugin/theme/childtheme projects. Npm package `generator-wp-dev-env`.

## Ecosystem (read before changing anything)

Part of the `wp-dev-env` toolset; works hand in hand with:

- `wp-dev-env-grunt` — build env generated projects depend on.
- `wp-dev-env-frame` (composer `croox/wp-dev-env-frame`) — PHP base classes for generated projects.

Local checkouts on the author's machine (not guaranteed elsewhere): grunt at `../wp-dev-env-grunt`, frame at `../../php_composer/wp-dev-env-frame`.

`package.json` `subModules` pins the versions of both sub-packages; templates inject them into generated projects (frame as `require-dev` composer dep from vcs repo + `wde` init arg; grunt as `git+ssh://...#<version>` npm dep). Release order: bump the sub-package first, then here update `subModules` and bump version (commits like "Update croox/wp-dev-env-frame v0.16.0" / "Update submodules and bump version X.Y.Z"). Consumers then receive the new sub-package versions by regenerating their projects — see "Regenerate an existing project".

## Commands

- `npm test` — runs eslint (pretest) then jest; no test files exist.
- `npm run buildDocs` — regenerates `docs/generator-wp-dev-env.docset` (Zeal/Dash docset) from the markdown docs source in `docs/src/` (`types/Guide/*.md`); run after changing generator behavior so docs stay in sync.
- Generate a project: `yo wp-dev-env` from an empty dir; re-run for subgenerators (assets, block, cpt, composerPackage).

## Regenerate an existing project (updateWde)

Purpose: update a generated project to a newer generator (and thereby its pinned `wp-dev-env-grunt` / `croox/wp-dev-env-frame` versions). This is how consumers receive sub-package updates.

- Prerequisites: run `yo wp-dev-env` in the project root; git repo initialized; working tree must be clean; `generated` branch must exist; the *globally installed* generator version is used — `npm install -g git+ssh://git@github.com/croox/generator-wp-dev-env` first if needed.
- Choose "Regenerate project into generated branch". It checks out `generated`, deletes the generated files (grunt/, src/, dist/, test_build/, Gruntfile.js, README.md, composer.json, package.json, .eslintrc.json, wde_wp_installs-sample.json, .wde_nextRelease.json, releases/readme.md, vendor/readme.md), re-generates everything from current templates using project metadata from the existing package.json, adds a `changed` entry to .wde_nextRelease.json and commits "Updated to generator-wp-dev-env#… (…)".
- Does NOT run npm install / composer update / grunt build. Afterwards: `npm install; composer update -vvv`, `grunt build`, compare commits, merge `generated` into `develop` (expect manual conflict resolution where custom code touched generated files).
- `generated` must stay pristine — it is wiped on regeneration. Branching model: `docs/src/types/Guide/git_branching_model.md`.

## Structure

- `generators/<name>/index.js` — subgenerator entrypoints; templates in `generators/<name>/templates/` use `_`-prefixed filenames (e.g. `_plugin_main_file.php`).
- `generators/app/template_collections/` — project flavors (underboots, underboots_simple_no_sidebar).
- `utils/` — shared generator helpers.

## Conventions

- Style enforced by eslint (xo + prettier) + lint-staged/husky; no dedicated format command.
- Never change sub-package versions without following the other packages' AGENTS.md release order.
