WordPress <%= startCase( projectType ) %> <%= displayName %>

<%= description %>

> <%= startCase( projectType ) %> readme: [./dist/trunk/README.md](<%= repositoryUri %>/tree/master/dist/trunk)

# Download and install

~~**<%= displayName %>** is [available in the official WordPress <%= startCase( projectType ) %> repository](https://wordpress.org/<%= projectType %>s/<%= name %>/). You can install this <%= projectType %> the same way you'd install any other <%= projectType %>.~~

To install it from zip file, [download latest release](<%= repositoryUri %>/releases/latest).

# Development

Clone the repository and make it your current working directory.

```
# Install npm dependencies
npm install

# Install composer dependencies
composer install --profile -v

# Build into `./test_build`
grunt build
```

> This <%= startCase( projectType ) %> is based on [generator-wp-dev-env](https://github.com/croox/generator-wp-dev-env). See `generator.version` in `package.json`.
>
> Read the [documentation](https://github.com/croox/generator-wp-dev-env#documentation) for further development information.

#### Dev dependencies

- `node` and `npm`
- `yo` and `generator-wp-dev-env`
- `composer`
- `git`
- `grunt`  and  `grunt-cli`
- `rsync`
- `xgettext`
- *(optional)*  `convert` from ImageMagick

# Support and feedback

* [Create a new issue on Github](<%= repositoryUri %>/issues/new)
* ~~[Add a new topic to WP's support forum](https://wordpress.org/support/<%= projectType %>/<%= name %>)~~
* ~~[Create a new review and rate this <%= startCase( projectType ) %>](https://wordpress.org/support/<%= projectType %>/<%= name %>/reviews/#new-post)~~
