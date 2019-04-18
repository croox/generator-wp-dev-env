
const addExtendedCptsCopyTask = grunt => {

	// Add 'copy:vendor_extended_cpts' to config copy
	grunt.hooks.addFilter( 'config.copy', '<%= funcPrefix %>.config.copy.vendor_extended_cpts', config => {
		const newConfig = {
			...config,
			vendor_extended_cpts: {
				expand: true,
				cwd: 'vendor/johnbillion/extended-cpts',
				src: [
					'**/*',
				],
				dest: grunt.option( 'destination' ) + '/vendor/johnbillion/extended-cpts',
			},
		};
		return newConfig;
	}, 10 );

	// Run 'copy:vendor_extended_cpts' on priority 20
	grunt.hooks.addFilter( 'tasks.build.tasks', '<%= funcPrefix %>.tasks.build.tasks.vendor_extended_cpts', tasks => {
		const newTasks = [
			...tasks,
			'copy:vendor_extended_cpts',
		];
		return newTasks;
	}, 20 );

}

module.exports = addExtendedCptsCopyTask;
