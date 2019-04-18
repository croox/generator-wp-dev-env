
const addCmb2CopyTask = grunt => {

	// Add 'copy:vendor_cmb2' to config copy
	grunt.hooks.addFilter( 'config.copy', '<%= funcPrefix %>.config.copy.vendor_cmb2', config => {
		const newConfig = {
			...config,
			vendor_cmb2: {
				expand: true,
				cwd: 'vendor/cmb2/cmb2',
				src: [
					'**/*',
					'!example-functions.php',
					'!**/*.po',
					'!**/*.pot',
					'!css/sass/**/*',
				],
				dest: grunt.option( 'destination' ) + '/vendor/cmb2/cmb2',
			},
		};
		return newConfig;
	}, 10 );

	// Run 'copy:vendor_cmb2' on priority 20
	grunt.hooks.addFilter( 'tasks.build.tasks', '<%= funcPrefix %>.tasks.build.tasks.vendor_cmb2', tasks => {
		const newTasks = [
			...tasks,
			'copy:vendor_cmb2',
		];
		return newTasks;
	}, 20 );

}

module.exports = addCmb2CopyTask;
