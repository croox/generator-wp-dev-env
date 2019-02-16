WordPress <%= startCase( projectType ) %> <%= displayName %>

<%= description %>

> Further information: [./dist/trunk/README.md](<%= repositoryUri %>/tree/master/dist/trunk)

* Contribution welcome :)
* For **support**, to **request new plugin-features** or inform me about **issues and bugs** [create a new issue on Github](<%= repositoryUri %>/issues/new) ~~or [add a new topic to WP's support forum](https://wordpress.org/support/plugin/<%= name %>)~~
* ~~Love to get your **feedback**, [Create a new review and rate this Plugin](https://wordpress.org/support/plugin/<%= name %>/reviews/#new-post),~~ write a tutorial and tell your friends.
* [Tell me](<%= authorUri %>) your wishes, maybe get me a bowl of rice and some masala: [Donate]<%= donateLink %>)

## How to install:

~~**<%= displayName %>** is [available in the official WordPress Plugin repository](https://wordpress.org/plugins/<%= name %>/). You can install this Plugin the same way you'd install any other plugin.~~

To install it from this Repository:

- download the latest release asset from [```Releases```](<%= repositoryUri %>/releases).
- alternatively download the latest distributed version from [```./dist/trunk```](<%= repositoryUri %>/tree/master/dist/trunk) and rename ```trunk``` to ```<%= name %>```
- upload to your plugins directory and activate

To test the latest commit or make code changes yourself:
- Clone, fork or [download](<%= repositoryUri %>/archive/master.zip) the repository

> This Plugin and its development environment are based on [generator-wp-dev-env](https://www.npmjs.com/package/generator-wp-dev-env) v<%= generator.version %>.