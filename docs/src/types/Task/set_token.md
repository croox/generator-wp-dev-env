# `set_token`

> Add/replace GitHub access token.

**`grunt set_token`**

The access token is required to generate a release and add the release assets.

This task is only available if the project is hosted on a certain platform. Currently `wp-dev-env-grunt` only supports `GitHub`.

The [`keytar`](https://github.com/atom/node-keytar) package is utilized to get, add, replace, and delete passwords in system's keychain. On macOS the passwords are managed by the Keychain, on Linux they are managed by the Secret Service API/libsecret, and on Windows they are managed by Credential Vault.
