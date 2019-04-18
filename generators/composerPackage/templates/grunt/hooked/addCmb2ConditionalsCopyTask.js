
const addCmb2ConditionalsCopyTask = grunt => {

	// Add 'copy:vendor_cmb2_conditionals' to config copy
	grunt.hooks.addFilter( 'config.copy', '<%= funcPrefix %>.config.copy.vendor_cmb2_conditionals', config => {
		const newConfig = {
			...config,
			vendor_cmb2_conditionals: {
				expand: true,
				cwd: 'vendor/jcchavezs/cmb2-conditionals',
				src: [
					'**/*',
					'!example-functions.php',
				],
				dest: grunt.option( 'destination' ) + '/vendor/jcchavezs/cmb2-conditionals',
			},
		};
		return newConfig;
	}, 10 );

	// Run 'copy:vendor_cmb2_conditionals' on priority 20
	grunt.hooks.addFilter( 'tasks.build.tasks', '<%= funcPrefix %>.tasks.build.tasks.vendor_cmb2_conditionals', tasks => {
		const newTasks = [
			...tasks,
			'copy:vendor_cmb2_conditionals',
		];
		return newTasks;
	}, 20 );

}

module.exports = addCmb2ConditionalsCopyTask;
