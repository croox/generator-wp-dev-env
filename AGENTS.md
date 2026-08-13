# AGENTS.md

Yeoman generator scaffolding grunt-based WordPress plugin/theme/childtheme projects. Npm package `generator-wp-dev-env`.

## Ecosystem (read before changing anything)

Part of the `wp-dev-env` toolset; works hand in hand with:

- `wp-dev-env-grunt` — build env generated projects depend on.
- `wp-dev-env-frame` (composer `croox/wp-dev-env-frame`) — PHP base classes for generated projects.

Local checkouts on the author's machine (not guaranteed elsewhere): grunt at `../wp-dev-env-grunt`, frame at `../../php_composer/wp-dev-env-frame`.

`package.json` `subModules` pins the versions of both sub-packages; templates inject them into generated projects (frame as `require-dev` composer dep from vcs repo + `wde` init arg; grunt as `git+ssh://...#<version>` npm dep). Release order: bump the sub-package first, then here update `subModules` and bump version (commits like "Update croox/wp-dev-env-frame v0.16.0" / "Update submodules and bump version X.Y.Z"). Consumers then receive the new sub-package versions by regenerating their projects — see "Regenerate an existing project".

## Commands

- `npm run lint` — `eslint .` (xo + prettier via `.eslintrc.js`); `npm run format` — `prettier . --write` (`.prettierrc`: tabs, single quotes). Run both after changing code.
- `npm test` — runs eslint (pretest) then jest; no test files exist, so jest exits 1 (expected).
- `npm run buildDocs` — regenerates the Zeal/Dash docset from `docs/src/` markdown. **The docset tooling is unused and planned for removal** — don't invest in fixing it; `buildDocs` needs the `sqlite3` devDep (docset-generator's sequelize loads it from the root).
- Generate a project: `yo wp-dev-env` from an empty dir; re-run for subgenerators (assets, block, cpt, composerPackage). Note: global `yo` 7.0.1 fails with `NotFound: FileSystem.access` in fresh empty dirs on this machine (README-tested yo is 4.3.0) — pre-existing, unrelated to this package.
- Weak connection workaround for the global install: `npm install -g /path/to/generator-wp-dev-env` (installs from the local working tree instead of git).

## Regenerate an existing project (updateWde)

Purpose: update a generated project to a newer generator (and thereby its pinned `wp-dev-env-grunt` / `croox/wp-dev-env-frame` versions). This is how consumers receive sub-package updates.

- Prerequisites: run `yo wp-dev-env` in the project root; git repo initialized; working tree must be clean; `generated` branch must exist; the _globally installed_ generator version is used — `npm install -g git+ssh://git@github.com/croox/generator-wp-dev-env` first if needed.
- Choose "Regenerate project into generated branch". It checks out `generated`, deletes the generated files (grunt/, src/, dist/, test_build/, Gruntfile.js, README.md, composer.json, package.json, .eslintrc.json, wde_wp_installs-sample.json, .wde_nextRelease.json, releases/readme.md, vendor/readme.md), re-generates everything from current templates using project metadata from the existing package.json, adds a `changed` entry to .wde_nextRelease.json and commits "Updated to generator-wp-dev-env#… (…)".
- Does NOT run npm install / composer update / grunt build. Afterwards: `npm install; composer update -vvv`, `grunt build`, compare commits, merge `generated` into `develop` (expect manual conflict resolution where custom code touched generated files).
- `generated` must stay pristine — it is wiped on regeneration. Branching model: `docs/src/types/Guide/git_branching_model.md`.

## Structure

- `generators/<name>/index.js` — subgenerator entrypoints; templates in `generators/<name>/templates/` use `_`-prefixed filenames (e.g. `_plugin_main_file.php`).
- `generators/app/template_collections/` — project flavors (underboots, underboots_simple_no_sidebar).
- `utils/` — shared generator helpers.

## Conventions

- Style enforced by eslint (xo + prettier); formatting via `npm run format`. `camelcase` is off (deliberate snake_case identifiers like `ui__resolver`).
- Never change sub-package versions without following the other packages' AGENTS.md release order.
- `**/templates` and `**/template_collections` are excluded from lint and format — they are generated-project content with placeholders.

## Known accepted-risk npm advisories

Remaining `npm audit` findings are dev-time tooling with no runtime exposure; fixes need breaking upgrades (yeoman-generator 8) or abandoned parents. Accepted and dismissed on GitHub:

- `@octokit/*` (moderate ReDoS) via `yeoman-generator` — fix is a breaking major upgrade.
- `@tootallnate/once` via npm signing internals (`@sigstore/tuf`).
- `brace-expansion` via eslint's pinned `minimatch@3`.
- `marked` via `docblock`; `sequelize` + `uuid` via `docset-generator` (abandoned; part of the docset tooling planned for removal).
- `showdown` (direct devDep, XSS/ReDoS advisories) — buildDocs only converts our own trusted docs markdown.
