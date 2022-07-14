## `./src/html_snapshots`

Contains snapshots of an actual website in html format.
It will be used as part of the `content` of the purgecss config.

### What happens on `build`, `watch` and `dist`

On `dist`, these html files will be a part of the `content` of the purgecss config.
On `build` and `watch` css will only be purged if the `--purge` flag is set.
