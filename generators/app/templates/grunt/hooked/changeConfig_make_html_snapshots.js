
const changeConfig_make_html_snapshots = grunt => {
    // Change the make_html_snapshots config.
	grunt.hooks.addFilter( 'config.make_html_snapshots', 'config.make_html_snapshots', ( config ) => {
        // Add some more paths.
		config.paths = [
			...config.paths,
            // '/example/path/somewhere',
		];
		return config;
	}, 10 );
}
module.exports = changeConfig_make_html_snapshots;
