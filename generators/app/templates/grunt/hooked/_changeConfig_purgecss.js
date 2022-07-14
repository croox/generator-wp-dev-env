const changeConfig_purgecss = grunt => {

	// // Filter tasks, remove all purgecss tasks.
	// grunt.hooks.addFilter( 'tasks.build.tasks', 'tasks.build.tasks.removePurge', ( tasks ) => {
	// 	const index = tasks.findIndex( task => task.startsWith( 'purgecss' ) );
	// 	if ( index !== -1 ) {
	// 		tasks.splice( index, 1 );
	// 	}
	// 	return tasks;
	// }, 999999 );

	// Filter purgecss config filesGlob.
	grunt.hooks.addFilter( 'config.purgecss.filesGlob', 'config.purgecss.filesGlob', ( filesGlob ) => {
		filesGlob.src = [
			...filesGlob.src,
			// '!**/example_stylesheet*',	// Skip this file.
		];
		return filesGlob;
	}, 10 );

	// Filter purgecss config.
	grunt.hooks.addFilter( 'config.purgecss', 'config.purgecss', ( config ) => {
		config.destination.options.content = [
			...config.destination.options.content,
			// ./src/something/**/*',
		];
		config.destination.options.safelist = [
			...config.destination.options.safelist,
			// 'red',
			// 'blue',
		];
		return config;
	}, 10 );

}
module.exports = changeConfig_purgecss;
