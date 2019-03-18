WordPress <%= startCase( projectType ) %> <%= displayName %>

<%= description %>

> Further information: [./dist/trunk/README.md](<%= repositoryUri %>/tree/master/dist/trunk)

* Contribution welcome :)
* For **support**, to **request new <%= projectType %>-features** or inform me about **issues and bugs** [create a new issue on Github](<%= repositoryUri %>/issues/new) ~~or [add a new topic to WP's support forum](https://wordpress.org/support/<%= projectType %>/<%= name %>)~~
* ~~Love to get your **feedback**, [Create a new review and rate this <%= startCase( projectType ) %>](https://wordpress.org/support/<%= projectType %>/<%= name %>/reviews/#new-post),~~ write a tutorial and tell your friends.
* [Tell me](<%= authorUri %>) your wishes, maybe get me a bowl of rice and some masala: [Donate](<%= donateLink %>)

## How to install:

~~**<%= displayName %>** is [available in the official WordPress <%= startCase( projectType ) %> repository](https://wordpress.org/<%= projectType %>s/<%= name %>/). You can install this <%= projectType %> the same way you'd install any other <%= projectType %>.~~

To install it from this Repository:

- download the latest release asset from [```Releases```](<%= repositoryUri %>/releases).
- alternatively download the latest distributed version from [```./dist/trunk```](<%= repositoryUri %>/tree/master/dist/trunk) and rename ```trunk``` to ```<%= name %>```
- upload to your <%= projectType %>s directory and activate

To test the latest commit or make code changes yourself:
- Clone, fork or [download](<%= repositoryUri %>/archive/master.zip) the repository

> This <%= startCase( projectType ) %> and its development environment are based on [<%= generator.name %>v](<%= generator.homepage %>).